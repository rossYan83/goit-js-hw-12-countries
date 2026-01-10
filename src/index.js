
import debounce from 'lodash.debounce';
import { alert, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import fetchCountries from './js/fetchCountries';
import refs from './js/refs';
import { countryListTemplate, countryCardTemplate } from './js/templates';

defaults.delay = 3000;
defaults.closer = true;
defaults.sticker = false;

refs.searchBox.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  const searchQuery = event.target.value.trim();

  clearCountryInfo();

  if (!searchQuery) {
    return;
  }

  fetchCountries(searchQuery)
    .then(handleSearchResults)
    .catch(handleSearchError);
}

function handleSearchResults(countries) {
  if (countries.length > 10) {
    showTooManyMatchesNotification();
    return;
  }

  if (countries.length >= 2 && countries.length <= 10) {
    renderCountryList(countries);
    return;
  }

  if (countries.length === 1) {
    renderCountryCard(countries[0]);
  }
}

function handleSearchError() {
  showNotFoundNotification();
}

function renderCountryList(countries) {
  const markup = `<ul class="country-list">${countryListTemplate(countries)}</ul>`;
  refs.countryInfo.innerHTML = markup;
}

function renderCountryCard(country) {
  refs.countryInfo.innerHTML = countryCardTemplate(country);
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}

function showTooManyMatchesNotification() {
  alert({
    text: 'Знайдено занадто багато країн. Будь ласка, уточніть запит!',
    type: 'notice',
  });
}

function showNotFoundNotification() {
  alert({
    text: 'Країну не знайдено. Спробуйте інший запит.',
    type: 'error',
  });
}