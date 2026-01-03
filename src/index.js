import debounce from 'lodash.debounce';
import PNotify from '@pnotify/core';

const searchBox = document.getElementById("search-box");
const result = document.getElementById("results");

searchBox.addEventListener(
  "input",
  debounce(onSearch, 500)
);

function onSearch(e) {
  const query = e.target.value.trim();

  if (!query) {
    result.innerHTML = "";
    return;
  }

  fetch(`https://restcountries.com/v2/name/${query}`)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(handleResults)
    .catch(() => {
      result.innerHTML = "";
      PNotify.alert({
        text: "Country not found",
        type: "error",
      });
    });
}

function handleResults(countries) {
  result.innerHTML = "";

  if (countries.length > 10) {
    PNotify.alert({
      text: "Too many matches found. Please enter a more specific query!",
      type: "info",
    });
    return;
  }

  // ✅ ONE country → detailed card
  if (countries.length === 1) {
    result.innerHTML = countryCardTemplate(countries[0]);
    return;
  }

  // ✅ MORE THAN ONE country → ONLY names list
  result.innerHTML = countryNamesListTemplate(countries);
}

function countryNamesListTemplate(countries) {
  return `
    <ul class="country-list">
      ${countries.map(c => `<li>${c.name}</li>`).join("")}
    </ul>
  `;
}

function countryCardTemplate(country) {
  const languages = country.languages
    .map(lang => `<li>${lang.name}</li>`)
    .join("");

  return `
    <div class="country-card">
      <div>
        <h2>${country.name}</h2>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Languages:</strong></p>
        <ul>${languages}</ul>
      </div>

      <img
        class="flag"
        src="${country.flag}"
        alt="Flag of ${country.name}"
      />
    </div>
  `;
}
