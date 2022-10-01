import { dropdownCityTemplate } from "/assets/js/modules/template.js";
import { CITIES_JSON_FILE } from "/assets/js/modules/config.js";

// cities
const contactCities = document.querySelector('.contact__cities');
// dropdown
const citiesDropdown = contactCities.querySelector('.cities__dropdown');
// search
const citiesSearch = document.getElementById('citiesSearch');
// selected
const citiesSelected = contactCities.querySelector('.cities__selected');
const citySelected = citiesSelected.querySelector('.city__selected');
// options
const citiesOptions = contactCities.querySelector('.cities__options');
// pages number start
const startPage = document.getElementById('pageStart');

// display cities
displayCities();

// events
// cities dropdown toggle
citiesSelected.addEventListener('click', citiesDropdownToggle);

// select clicked option
citiesOptions.addEventListener('click', (e) => {
  const option = e.target;

  // if its option
  // and not selected one
  //  && !option.classList.contains('selected')
  if (option.classList.contains('cities__option')) {
    // enable current option
    changeSelectedOption(option);
  }
});

// fillter search
citiesSearch.addEventListener("keyup", filterCities);

// search input select with enter
citiesSearch.addEventListener("keypress", (event) => {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action
    event.preventDefault();

    // select first visible option
    const option = citiesOptions.querySelector('.cities__option:not([style*="display: none"])');

    // if its has value select it
    // and not selected one
    //  && !option.classList.contains('selected')
    if (option) {
      changeSelectedOption(option);
    }
  }
});

// functions

// toggle dropdown cities
function citiesDropdownToggle() {
  citiesSelected.classList.toggle('active');
  citiesDropdown.classList.toggle('active');

  // focus cities search if dropdown active
  if (citiesDropdown.classList.contains('active')) {
    setTimeout(() => citiesSearch.focus(), 100);
  }
  else {
    // focus next input
    startPage.focus();
  }
}

// change selected option
function changeSelectedOption(selected) {
  // remove old selected option
  const option = citiesOptions.querySelector('.cities__option.selected');
  option.classList.remove('selected');
  // select new selected option
  selected.classList.add('selected');
  // change dropdown city selected text
  citySelected.innerText = selected.textContent;

  // clear cities search value
  citiesSearch.value = '';

  // close dropdown toggle
  citiesDropdownToggle();

  // focus next input
  startPage.focus();

  // display all filtered items
  filterCities();
}

// display cities
function displayCities() {
  fetch(CITIES_JSON_FILE).then(response => response.json())
    .then(cities => cities.forEach(city => {
      // set the location for current element
      let location = 'beforeend';

      // get city template
      const cityElement = dropdownCityTemplate(city.name, city.slug, city.selected);

      // if its selected option display it as firstChild
      if (city.selected) {
        location = 'afterbegin';
        citySelected.innerText = city.name;
      }

      // insert element to cities options
      citiesOptions.insertAdjacentHTML(location, cityElement);
    }));

}

// filter cities
function filterCities() {
  // select cities options
  const citiesOption = contactCities.querySelectorAll('.cities__option');

  // filter text
  let filter = citiesSearch.value;

  // if option contains filter string show it
  // note: empty string always matched
  for (const option of citiesOption) {
    // get option text
    let text = option.textContent.replaceAll('آ', 'ا');

    // if filtered text exist in option text display it
    if (text.indexOf(filter) > -1)
      option.style.display = '';
    else
      option.style.display = 'none';
  }
}

