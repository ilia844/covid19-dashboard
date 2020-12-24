import createElem from './utils/createElement';
import clearParentContainer from './utils/clearParentContainer';
import translatePer100k from './utils/translatePer100k';

export default class Table {
  createTableLayout = (data, isPer100k, isToday) => {
    const tableContainer = document.querySelector('.table');
    clearParentContainer(tableContainer);
    const fragment = document.createDocumentFragment();
    data.forEach((dataElement) => {
      const tr = createElem('tr');
      let elemCases = dataElement.cases;
      let elemDeaths = dataElement.deaths;
      let elemRecovered = dataElement.recovered;
      if (isToday) {
        elemCases = dataElement.todayCases;
        elemDeaths = dataElement.todayDeaths;
        elemRecovered = dataElement.todayRecovered;
      }
      if (isPer100k) {
        const casePer100k = translatePer100k(elemCases, dataElement.population);
        const deathsPer100k = translatePer100k(elemDeaths, dataElement.population);
        const recoveredPer100k = translatePer100k(elemRecovered, dataElement.population);
        tr.insertAdjacentHTML('afterbegin', `<td>${dataElement.country}</td><td>${casePer100k}</td><td>${deathsPer100k}</td><td>${recoveredPer100k}</td>`);
      } else {
        tr.insertAdjacentHTML('afterbegin', `<td>${dataElement.country}</td><td>${elemCases}</td><td>${elemDeaths}</td><td>${elemRecovered}</td>`);
      }
      fragment.appendChild(tr);
    });
    tableContainer.append(fragment);
  }

  createTableCountry = (data, currentCountry, isPer100k, isToday) => {
    const tableContainer = document.querySelector('.table');
    const dataElement = data.find((el) => el.country === currentCountry);
    clearParentContainer(tableContainer);
    const tr = createElem('tr');
    let elemCases = dataElement.cases;
    let elemDeaths = dataElement.deaths;
    let elemRecovered = dataElement.recovered;
    if (isToday) {
      elemCases = dataElement.todayCases;
      elemDeaths = dataElement.todayDeaths;
      elemRecovered = dataElement.todayRecovered;
    }
    if (isPer100k) {
      const casePer100k = translatePer100k(elemCases, dataElement.population);
      const deathsPer100k = translatePer100k(elemDeaths, dataElement.population);
      const recoveredPer100k = translatePer100k(elemRecovered, dataElement.population);
      tr.insertAdjacentHTML('afterbegin', `<td>${dataElement.country}</td><td>${casePer100k}</td><td>${deathsPer100k}</td><td>${recoveredPer100k}</td>`);
    } else {
      tr.insertAdjacentHTML('afterbegin', `<td>${dataElement.country}</td><td>${elemCases}</td><td>${elemDeaths}</td><td>${elemRecovered}</td>`);
    }
    tableContainer.append(tr);
  }
}
