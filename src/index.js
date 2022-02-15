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

clock();

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
        clear();
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

function clock() {
  const deg = 6;
  const hr = document.querySelector('#hr');
  const mn = document.querySelector('#mn');
  const sc = document.querySelector('#sc');

  setInterval(() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;
    hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
  });
}
