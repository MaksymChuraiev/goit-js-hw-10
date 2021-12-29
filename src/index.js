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
// Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
// Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);

refs.input.addEventListener('input', debounce(onChangeCountry, DEBOUNCE_DELAY));

function onChangeCountry(e) {
  e.preventDefault();

  const form = e.target.value;

  // fetchCountries(form).then(responce => {
  //   if (responce.length > 10) {
  //     Notify.failure('Too many matches found. Please enter a more specific name.');
  //   }
  //   // renderCountryCart;

  //   // if (responce.length > 1) {
  //   //   renderCountryList;
  //   // }
  //   // if (responce.length === 1) {
  //   //   renderCountryCart;
  //   // }
  // });
}

function renderCountryCart(country) {
  const markup = itemsTemplate(country);
  refs.countryInfo.innerHTML = markup;
}

function renderCountryList(countries) {
  const markupList = countriesTemplate;
  refs.countryList.innerHTML = markupList;
}
