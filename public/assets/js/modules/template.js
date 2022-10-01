function postTemplate(post) {
  return `
    <!-- item -->
    <div class="post__item" data-save-item="${post.id}">
      <!-- title -->
      <label for="postTitle">عنوان :</label>
      <div id="postTitle" class="post__title">
        <a href="${post.link}" target="_blank">${post.title}</a>
      </div>
      <!-- time -->
      <label for="postTime">زمان :</label>
      <time id="postTime" datetime="${post.time}" title="${post.time}">
      ${post.localtime}
      </time>
      <!-- location -->
      <label for="postCity">شهر :</label>
      <div id="postCity">
      ${post.city}
      </div>
      <!-- contact -->
      <label for="postContact">شماره :</label>
      <div id="postContact">${post.contact}</div>
    </div>`;
}

function alertTemplate(message) {
  return `
    <!-- post alert -->
    <div class="post__alert">
      <div class="post__message">${message}</div>
    </div>`;
}

function pageNumberTemplate(pageNumber) {
  return `
    <!-- page number -->
    <div class="post__page">
      <div class="page__number">${pageNumber}</div>
    </div>`;
}

function dropdownCityTemplate(name, slug, selected) {
  let selectedClass = selected ? ' selected' : '';

  return `
    <div class="cities__option${selectedClass}" data-city-slug="${slug}">${name}</div>`;
}

export {
  postTemplate,
  alertTemplate,
  pageNumberTemplate,
  dropdownCityTemplate,
};

