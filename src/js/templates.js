export function countryListTemplate(countries) {
  return countries
    .map(
      country => `
      <li class="country-list-item">
        <img src="${country.flag}" alt="${country.name} flag" class="country-list-flag" />
        <span class="country-list-name">${country.name}</span>
      </li>
    `,
    )
    .join('');
}

export function countryCardTemplate(country) {
  const languages = country.languages
    .map(lang => lang.name)
    .join(', ');

  return `
    <div class="country-card">
      <div class="country-card-header">
        <img src="${country.flag}" alt="${country.name} flag" class="country-card-flag" />
        <h2 class="country-card-name">${country.name}</h2>
      </div>
      <div class="country-card-info">
        <p><strong>Столиця:</strong> ${country.capital || 'Н/Д'}</p>
        <p><strong>Населення:</strong> ${country.population.toLocaleString('uk-UA')}</p>
        <p><strong>Мови:</strong> ${languages}</p>
      </div>
    </div>
  `;
}