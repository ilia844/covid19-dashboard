import pageLayout from './nls/pageLayoutElements';
import createElem from './utils/createElement';

export default class Table {
  createTableLayout = (data) => {
    const tableContainer = document.querySelector('.container_table');
    tableContainer.insertAdjacentHTML('afterbegin', pageLayout.tableElements);
    const table = document.querySelector('.table');
    const fragment = document.createDocumentFragment();
    data.forEach((dataElement) => {
      const tr = createElem('tr');
      tr.insertAdjacentHTML('afterbegin', `<td>${dataElement.country}</td><td>${dataElement.cases}</td><td>${dataElement.deaths}</td><td>${dataElement.recovered}</td>`);
      fragment.appendChild(tr);
    });
    table.append(fragment);
  }

  // createTableOneCountry = () => {

  // }
}
