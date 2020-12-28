import debounce from 'lodash.debounce';
import './styles.css';
import fetchCountries from './js/fetchCountries';
import countriesTpl from './templates/countries.hbs';
import countryTpl from './templates/country.hbs';
import * as Toastr from 'toastr';
import '../node_modules/toastr/build/toastr.css';
// import './/../node_modules/toastr/build/toastr.css'; //You need style and css loader installed and set(так тоже работает)
const url = 'https://restcountries.eu/rest/v2/name/';
// const options = {
//   method: 'GET', //по умолчанию
//   Accepted: 'application/json', //по умолчанию
// };

const refs = {
  countriesContainer: document.querySelector('.js-countries'),
  searchForm: document.querySelector('.js-search-form'),
};
refs.searchForm.addEventListener('input', debounce(inputSearch, 500));
function inputSearch(event) {
  event.preventDefault();

  const inputValue = refs.searchForm.elements.query.value;
  // console.log(url + inputValue);

  refs.countriesContainer.innerHTML = '';
  fetchCountries(url + inputValue).then(updateCountriesMarkup);
}
Toastr.options.timeout = 1000; //Change the settings
let markup;
function updateCountriesMarkup(countries) {
  // console.log(countries.length);
  if (countries.length <= 10 && countries.length > 1) {
    markup = countriesTpl(countries);
    refs.countriesContainer.insertAdjacentHTML('beforeend', markup);
  } else if (countries.length === 1) {
    markup = countryTpl(countries);
    refs.countriesContainer.insertAdjacentHTML('beforeend', markup);
  } else {
    Toastr.warning('Уточните запрос');
  }
}
