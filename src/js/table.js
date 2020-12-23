// import pageLayout from './nls/pageLayoutElements';
import createElem from './utils/createElement';
import clearParentContainer from './utils/clearParentContainer';

export default class Table {
  createTableLayout = (data) => {
    const tableContainer = document.querySelector('.table');
    clearParentContainer(tableContainer);
    // tableContainer.insertAdjacentHTML('afterbegin', pageLayout.tableElements);
    // const table = document.querySelector('.table');
    const fragment = document.createDocumentFragment();
    data.forEach((dataElement) => {
      const tr = createElem('tr');
      tr.insertAdjacentHTML('afterbegin', `<td>${dataElement.country}</td><td>${dataElement.cases}</td><td>${dataElement.deaths}</td><td>${dataElement.recovered}</td>`);
      fragment.appendChild(tr);
    });
    tableContainer.append(fragment);
  }

  createTableOneCountry = (data, currentCountry) => {
    const tableContainer = document.querySelector('.table');
    const dataElem = data.find((el) => el.country === currentCountry);
    clearParentContainer(tableContainer);
    const tr = createElem('tr');
    tr.insertAdjacentHTML('afterbegin', `<td>${currentCountry}</td><td>${dataElem.cases}</td><td>${dataElem.deaths}</td><td>${dataElem.recovered}</td>`);
    tableContainer.append(tr);
  }
}
