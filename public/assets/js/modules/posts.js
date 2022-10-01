import {
  postTemplate,
  alertTemplate,
  pageNumberTemplate,
} from '/assets/js/modules/template.js';

const collectorPost = document.querySelector('.collector__post');
const postHeader = document.querySelector('.collector__post .post__header');

// apis
const API_POSTS = (name, page) => `/posts/${name}/${page}`;
const API_CONTACT = (postId) => `/contact/${postId}`;

// functions
// get posts
function getPosts(city, page) {
  return fetch(API_POSTS(city, page)).then(res => res.json());
}

// get posts contact
function getPostsContact(posts) {
  // posts promise
  let postsPromise = posts.map(post => {
    return fetch(API_CONTACT(post.id))
      .then(res => res.json())
      .then(res => {
        post.contact = res.contact;

        return post;
      })
  });

  // return all promises
  return Promise.all(postsPromise);
}

// display posts in collector post
function displayPosts(posts) {
  let postsWithContact = posts.filter(post => post.contact);
  let postsWithoutContact = posts.filter(post => !post.contact);

  // display posts with contact
  for (const post of postsWithContact) {
    let postElement = postTemplate(post);
    collectorPost.insertAdjacentHTML("beforeend", postElement);
  }

  // return posts without contact
  return postsWithoutContact;
}

// display page number
function displayPageNumber(page, pages) {
  let pageNumberElement = pageNumberTemplate(`${page} / ${pages}`);
  collectorPost.insertAdjacentHTML("beforeend", pageNumberElement);
}

// display Message
function displayMessage(message, removeTimeout = 0) {
  let firstChild = collectorPost.querySelector('.post__alert');

  // add message after post header
  let msgElement = alertTemplate(message);
  postHeader.insertAdjacentHTML("afterend", msgElement);

  // select first message element
  msgElement = collectorPost.querySelector('.post__alert');

  // dont repeat alerts if one already exist
  if (firstChild && msgElement.textContent == firstChild.textContent) {
    // remove new message
    collectorPost.removeChild(msgElement);

    // set msg element to first child
    msgElement = firstChild;
  }
  else if (removeTimeout) {
    // remove message after timeout
    setTimeout(() => {
      collectorPost.removeChild(msgElement)
    }, removeTimeout);

  }

  // scroll to new message
  setTimeout(() => {
    msgElement.scrollIntoView({ block: "center" });
  }, 500);

  // return message element
  return msgElement;
}


// download posts
function downloadPosts(posts) {
  var dataPosts = encodeURIComponent(JSON.stringify(posts, null, 2));
  var link = document.createElement('a');
  link.setAttribute("href", "data:text/json;charset=utf-8," + dataPosts);
  link.setAttribute("download", `sheypoor-posts.json`);
  link.click();
}

export {
  getPosts,
  getPostsContact,
  displayPosts,
  displayPageNumber,
  displayMessage,
  downloadPosts
}