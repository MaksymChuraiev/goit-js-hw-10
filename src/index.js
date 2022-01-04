import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import itemsTemplate from './template/index.hbs';
import countriesTemplate from './template/countries-list.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onChangeCountry, DEBOUNCE_DELAY));

function onChangeCountry(e) {
  e.preventDefault();

  let search = refs.input.value.trim();
  if (search === '') {
    clear();
    return;
  }

  fetchCountries(search)
    .then(responce => {
      if (responce.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (responce.length > 1 && responce.length <= 10) {
        renderCountryList(responce);
      }
      if (responce.length === 1) {
        renderCountryCart(responce);
      }
    })
    .catch(error => {
      clear();
      Notify.failure('Oops, there is no country with that name');
      return error;
    });
}

function renderCountryCart(country) {
  const markup = itemsTemplate(country);

  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = markup;
}

function renderCountryList(countries) {
  const markupList = countriesTemplate(countries);

  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = markupList;
}

function clear() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
