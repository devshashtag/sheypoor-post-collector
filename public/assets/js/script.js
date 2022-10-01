// dropdown
import '/assets/js/modules/dropdown.js';

// config
import {
  IGNORE_POSTS_ERROR,
  MESSAGE_TIMEOUT,
  messages,
  // functions
  addActive,
  removeActive,
  toggleActive,
} from '/assets/js/modules/config.js';

// posts functions
import {
  getPosts,
  getPostsContact,
  displayPosts,
  displayPageNumber,
  displayMessage,
  downloadPosts
} from '/assets/js/modules/posts.js';


// failed posts
let failedPosts = {
  posts: [],
  messageElm: undefined,
  city: undefined,
  current: undefined,
  end: undefined,
};

// contact inputs
const contact = document.querySelector('.sheypoor__contact');
const btnSubmit = document.querySelector('.contact__submit');

// collector post
const collector = document.querySelector('.sheypoor__collector');
const collectorPost = document.querySelector('.collector__post');

// options back, download, continue
const optionsBack = document.querySelector('.options__back');
const optionsDownload = document.querySelector('.options__download');
const optionsContinue = document.querySelector('.options__continue');

// status
const optionsStatus = document.querySelector('.options__status');

// pages number(start, end)
const startPage = document.getElementById('pageStart');
const endPage = document.getElementById('pageEnd');

// set failed posts
function setFailedPosts(posts, city, current, end) {
  let message = posts.length ? messages.contactLimit : messages.pageError;

  // display limit message
  failedPosts.messageElm = displayMessage(message);
  // posts
  failedPosts.posts = posts;
  // posts city
  failedPosts.city = city;
  // current page
  failedPosts.current = current;
  // end page
  failedPosts.end = end;

  // change status to failed
  statusChange('failed');

  // display continue button
  toggleContinue();
}

// get and display posts
async function getAndDisplayPosts(city, start, end) {
  for (let page = start; page <= end; page++) {
    // display page number
    displayPageNumber(page, end);

    // geting posts
    let posts = await getPosts(city, page);

    // try again if there is an error
    if (posts.length == 0) {
      posts = await getPosts(city, page);
    }

    // cannot get posts
    if (posts.length == 0) {
      // remove page number
      collectorPost.removeChild(collectorPost.lastChild);

      // save page for continue later
      setFailedPosts(posts, city, page, end);

      return;
    }

    // display posts in collector post
    let postsWithoutContact = displayPosts(posts);

    // save failed posts
    if (postsWithoutContact.length > IGNORE_POSTS_ERROR) {
      setFailedPosts(postsWithoutContact, city, page, end);
      return;
    }
  }

  // its end page change status to done
  statusChange('done');
}

// toggle continue option
function toggleContinue() {
  toggleActive(optionsContinue);
}

// switch between contact, collector
function toggleSections() {
  toggleActive(contact);
  toggleActive(collector);
}

// switch collector Status(loading, done, failed)
function statusChange(status) {
  let activeStatus = optionsStatus.querySelector('.active');
  let selectedStatus = optionsStatus.querySelector(`.status__${status}`);

  // remove active status if exist
  if (activeStatus)
    removeActive(activeStatus);

  // active selected status
  addActive(selectedStatus);
}

// error message for inputs number
function pageNumberError(element, error, defaultMessage) {
  element.style.fontSize = '1rem';
  element.classList.toggle('error');
  element.placeholder = error;
  element.value = '';
  element.focus();

  setTimeout(() => {
    element.style.fontSize = '1.2rem';
    element.classList.toggle('error');
    element.placeholder = defaultMessage;
  }, 1000);
}

// input number validation
function isStartValid() {
  let start = startPage.value;
  let defaultMessage = 'صفحه شروع';

  // empty check
  if (!start) {
    pageNumberError(startPage, 'یک عدد وارد کنید', defaultMessage);
    return false;
  }

  // zero check
  if (+start == 0) {
    pageNumberError(startPage, 'عدد بزرگتر وارد کنید', defaultMessage);
    return false;
  }

  // check max range
  if (+start > +startPage.max) {
    pageNumberError(startPage, 'عدد کوچکتر وارد کنید', defaultMessage);
    return false;
  }

  // start page value is valid
  return true;
}

function isEndValid() {
  let start = startPage.value;
  let end = endPage.value;
  let defaultMessage = 'صفحه پایان';

  // empty check
  if (!end) {
    pageNumberError(endPage, 'یک عدد وارد کنید', defaultMessage);
    return false;
  }

  // zero check
  if (+end == 0) {
    pageNumberError(endPage, 'عدد بزرگتر وارد کنید', defaultMessage);
    return false;
  }

  // check max range
  if (+end > +endPage.max) {
    pageNumberError(endPage, 'عدد کوچکتر وارد کنید', defaultMessage);
    return false;
  }

  // is start greater than end
  if (start && +start > +end) {
    pageNumberError(endPage, 'باید از شروع بزرگتر باشد', defaultMessage);
    return false;
  }

  // end page value is valid
  return true;
}

// focus next on enter
function focusNext(elm, isValidCB, nextElm) {
  elm.addEventListener("keypress", (event) => {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter" && isValidCB()) {
      // Cancel the default action
      event.preventDefault();

      if (nextElm == btnSubmit) {
        // if next element is submit button click it
        btnSubmit.click();
      } else {
        // focus next element
        nextElm.focus()
      }
    }
  });
}

// events
// focus next on enter while start page isvalid
focusNext(startPage, isStartValid, endPage);

// focus next on enter while end page isvalid
focusNext(endPage, isEndValid, btnSubmit);

// submit button
btnSubmit.addEventListener('click', async function () {
  const optionSelected = document.querySelector('.cities__option.selected');

  let city = optionSelected.dataset.citySlug;
  let start = startPage.value;
  let end = endPage.value;

  console.log('city:', city, 'start:', start, 'end:', end);

  // if inputs number(start or end) not valid return
  if (!isStartValid() || !isEndValid()) {
    return;
  }

  // switch section to collector
  toggleSections();

  // change status to loading
  statusChange('loading');

  // get and display posts
  await getAndDisplayPosts(city, +start, +end);
});

// back to contact
optionsBack.addEventListener('click', function () {
  let answer = confirm(messages.back);

  if (answer)
    location.reload();
})

// download current posts
optionsDownload.addEventListener('click', function () {
  let posts = [];

  const postElements = document.querySelectorAll('.collector__post .post__item');

  if (!postElements.length) {
    displayMessage(messages.downloadNoData, MESSAGE_TIMEOUT);
    return;
  }

  for (const post of postElements) {
    let postId = post.dataset.saveItem;
    let postTime = post.querySelector('#postTime');
    let postContact = post.querySelector('#postContact');
    let postLink = post.querySelector('.post__title a');
    let postCity = post.querySelector('#postCity');

    posts.push({
      id: postId,
      time: postTime.dateTime,
      contact: postContact.textContent,
      title: postLink.innerText,
      city: postCity.innerText,
      link: decodeURIComponent(postLink.href),
    })
  }

  downloadPosts(posts);
  displayMessage(messages.download, MESSAGE_TIMEOUT);
});

// continue current failed posts
optionsContinue.addEventListener('click', async function () {
  // get error data
  let city = failedPosts.city;
  let current = +failedPosts.current;
  let end = failedPosts.end;

  // remove error message
  collectorPost.removeChild(failedPosts.messageElm);

  // change status to loading
  statusChange('loading');

  // hide continue button
  toggleContinue();

  if (failedPosts.posts.length) {
    // get failed posts
    let posts = await getPostsContact(failedPosts.posts);

    // display posts in collector post
    let postsWithoutContact = displayPosts(posts);

    // ignore any failed posts
    if (postsWithoutContact.length) {
      console.log('ignored posts:', postsWithoutContact)
    }

    // go to next page
    current++;
  }

  // if its not end page continue
  if (current <= end) {
    // get and display posts
    await getAndDisplayPosts(city, current, end);

    return;
  }

  // its end page change status to done
  statusChange('done');
});