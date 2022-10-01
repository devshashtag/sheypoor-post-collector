const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

// default config
const POSTS_TIMEOUT = 10000 // 10 sec
const CONTACTS_TIMEOUT = 0 // 0 sec

// server port
const args = process.argv.slice(2);
const port = args[0] || 8080;

// post classes
const CLASS_POST = '.serp-item.list';
const CLASS_POST_CONTENT = `${CLASS_POST} > .content`;
const CLASS_POST_TIME = 'time';
const CLASS_POST_LINK = 'a';
const CLASS_POST_CITY = 'p'
const DATA_POST_ID = 'save-item';
const CLASS_POST_ID = `span[data-${DATA_POST_ID}]`;

// sheypoor apis
const SITE_URL = 'https://www.sheypoor.com';
const API_CITY = cityName => `${SITE_URL}/${cityName}`;
const API_PAGE = (city, page) => `${API_CITY(city)}${page ? `?p=${page}` : ''}`;
const API_CONTACT = postId => `${SITE_URL}/api/web/listings/${postId}/number`;

// get random range between start, end
function randomRange(start = 0, end = 254) {
  return +(Math.random() * (end - start)).toFixed() + start;
}

// generate new app ip
function newAppIp(timeout) {
  let appIp = `2.178.${randomRange()}.${randomRange()}`;
  let config = { headers: { 'X-Forwarded-For': appIp } }

  if (timeout) {
    config.timeout = timeout;
  }

  return config;
}

// functions
// get posts
async function getPosts(city = 'تهران', page = 1) {
  // post infos
  let posts = [];
  let postId, postTitle, postTime, postLocaltime, postCity;

  console.log('--------------------------------------')

  // get posts
  let res = await axios.get(API_PAGE(city, page), newAppIp(POSTS_TIMEOUT))
    .catch(err => console.log('posts error:', err.errno));

  // return if result empty
  if (!res) return;

  // load response body
  const $ = cheerio.load(res.data);

  // fetch posts content
  $(CLASS_POST_CONTENT).each((i, e) => {
    const content = $(e);
    let time = content.find(CLASS_POST_TIME).attr('datetime');

    // content info
    postId = content.find(CLASS_POST_ID).data(DATA_POST_ID);
    postTitle = content.find(CLASS_POST_LINK).html().trim();
    postLink = content.find(CLASS_POST_LINK).attr('href');
    postTime = time.split('.')[0].replaceAll(':', '-');
    postLocaltime = content.find(CLASS_POST_TIME).text();
    postCity = content.children(CLASS_POST_CITY).last().text();

    // push post content
    posts.push({
      id: postId,
      title: postTitle,
      time: postTime,
      localtime: postLocaltime,
      link: postLink,
      city: postCity,
    });
  });

  // return if posts empty
  if (!posts) return;

  // log request
  console.log('posts request: ', {
    city: decodeURIComponent(city),
    post: posts.length,
    page: (page == 0) ? 1 : page
  });

  // get posts contact
  let contactPromises = posts.map(post =>
    axios.get(API_CONTACT(post.id), newAppIp(CONTACTS_TIMEOUT)).then((res) => {
      // get contact if exist
      post.contact = res.data?.data?.mobileNumber;

      // request log
      console.log('posts contact request: ', { id: post.id, contact: post.contact });

      // return post with contact
      return post;
    }).catch(err => {
      console.log('posts contact error:', err.errno);

      return post;
    })
  );

  // return posts with contact
  return Promise.all(contactPromises);
}

// get post contact
function getContact(postId) {
  return axios.get(API_CONTACT(postId), newAppIp(CONTACTS_TIMEOUT))
    .then((res) => {
      // get contact if exist
      let contact = res.data?.data?.mobileNumber;

      // request log
      console.log('contact request: ', { id: postId, contact });

      return contact;
    })
    .catch(err => console.log('contact error:', err.errno));
}

// express
const app = express();

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// static files
app.use(express.static('public'));

// routes
// get posts by city
app.get('/posts/:city/:page?', async function (req, res) {
  const city = encodeURIComponent(req.params.city);

  let page = Math.abs(+req.params.page);

  if (!page || page == 1) page = 0;

  // get posts
  let posts = await getPosts(city, page);

  // if posts empty return empty json
  let response = (!posts) ? [] : posts;

  res.json(response);
});

// get post contact
app.get('/contact/:id', async function (req, res) {
  const postId = req.params.id;

  // get contact by post-id
  let contact = await getContact(postId);

  // return contact if post-id is exist
  res.json({ contact });
});

// home page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// 404
app.get('*', function (req, res) {
  console.log(`${req.url} redirected to /`);
  res.status(404).send('404 not found');
});

// on port listening
app.listen(port, () => console.log(`Sheypoor listening at http://localhost:${port}`));
