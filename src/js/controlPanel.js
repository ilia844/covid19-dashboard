import elements from './nls/pageLayoutElements';
import createElem from './utils/createElement';

export default class ControlPanel {
  createMapControl = () => {
    const map = document.getElementById('map');
    const div = createElem('div', 'map-controller');
    map.append(div);
    div.insertAdjacentHTML('beforeend', elements.caseController);
    div.insertAdjacentHTML('beforeend', elements.toggleController);
  }

  createTableControl = () => {
    const table = document.querySelector('.container_table');
    const div = createElem('div', 'table-controller');
    table.append(div);
    div.insertAdjacentHTML('beforeend', elements.toggleController);
  }

  createListControl = () => {
    const list = document.querySelector('.list');
    const div = createElem('div', 'list-controller');
    list.prepend(div);
    div.insertAdjacentHTML('beforeend', elements.caseController);
    div.insertAdjacentHTML('beforeend', elements.toggleController);
  }

  createChartControl = () => {
    const chart = document.querySelector('.container_chart');
    const div = createElem('div', 'chart-controller');
    chart.append(div);
    div.insertAdjacentHTML('beforeend', elements.caseController);
    div.insertAdjacentHTML('beforeend', elements.toggleController);
  }

  createAllControlPanels = () => {
    this.createMapControl();
    this.createTableControl();
    this.createListControl();
    this.createChartControl();
  }
}
