import CreatePageLayout from './createPageLayout';
import CountriesList from './countriesList';
import Data from './data';
import CreateMap from './map';
import Keyboard from './keyboard';
import Search from './search';
import mapCountryIdentify from './utils/mapCountryIdentificator';
import Table from './table';
import ControlPanel from './controlPanel';
import changeIndicator from './utils/changeIndicator';
import totalToToday from './utils/totalToToday';
import ControllerChart from './controller-chart';

export default class ControllerApp {
  constructor() {
    this.data = new Data();
    this.mapCreator = new CreateMap();
    this.table = new Table();
    this.controlPanel = new ControlPanel();
    this.chartController = new ControllerChart();
  }

  modules = {
    pageCreator: null,
    countriesList: null,
    keyboard: null,
    search: null,
  }

  dataObj = null;

  state = {
    indicator: 'cases',
    isToday: false,
    isPer100k: false,
    country: null,
  }

  runModules = () => {
    this.modules.pageCreator = new CreatePageLayout();
    this.modules.countriesList = new CountriesList(this.dataObj);
    this.modules.keyboard = new Keyboard();
    this.modules.search = new Search(this.dataObj);
  }

  async init() {
    this.dataObj = await this.data.load();
    this.runModules();
    this.modules.pageCreator.renderPageLayout();
    this.modules.countriesList.countriesWrapperRender();
    this.modules.countriesList.countriesContentRender(this.state.indicator, this.state.isPer100k);
    this.modules.search.createSearchFiled();
    this.table.createTableLayout(this.dataObj);
    this.mapCreator.createMap(this.dataObj);
    this.mapCreator.createLegendIcon();
    this.mapCreator.renderLegend();
    this.controlPanel.createAllControlPanels();
    this.mapEventHandler();
    this.modules.keyboard.init();
    this.globalEventHandler();
    this.chartController.createChart();
    this.chartController.renderChart('all', false)
      .then(() => this.chartController.changeChart('dailyCases'));
  }

  mapEventHandler = () => {
    const map = document.querySelector('.mapboxgl-map');
    const markers = document.querySelectorAll('.marker');
    const popup = document.querySelector('.mapboxgl-popup');
    const legendIcon = document.querySelector('.map-legend-icon');
    const legend = document.querySelector('.map-legend');

    map.addEventListener('mousemove', (e) => {
      if (Array.prototype.indexOf.call(markers, e.target) !== -1) {
        const targetCodeCountry = e.target.dataset.code;
        const paramsPopup = mapCountryIdentify(this.dataObj, targetCodeCountry, this.state
          .indicator, this.state.isPer100k);
        this.mapCreator.renderPopup(...paramsPopup);
        popup.classList.add('active');
      } else {
        popup.classList.remove('active');
      }
    });

    map.addEventListener('click', (e) => {
      if (e.target === legendIcon) {
        legend.classList.toggle('active');
      } else if (e.target !== legend) {
        legend.classList.remove('active');
      }
    });
  }

  globalEventHandler = () => {
    const searchInput = document.querySelector('.search__input');
    const btnGlobal = document.querySelectorAll('.btn-global');
    const togglePer100k = document.querySelectorAll('.toggle__per100k');
    const toggleToday = document.querySelectorAll('.toggle__today-all');
    const btnNext = document.querySelectorAll('.btn-next');
    const btnPrev = document.querySelectorAll('.btn-prev');
    const listItems = document.querySelectorAll('.list__item__country');
    const markers = document.querySelectorAll('.marker');
    const display = document.querySelectorAll('.display-current-indicator');
    const currentIndicator = this.state.indicator;
    window.addEventListener('click', (e) => {
      if (Array.prototype.indexOf.call(listItems, e.target) !== -1) {
        const countryTarget = e.target.innerText;
        this.mapCreator.mapFlyToCountry(countryTarget);
        this.table.createTableCountry(this.dataObj, countryTarget);
        this.state.country = countryTarget;
        searchInput.value = '';
      }
      if (Array.prototype.indexOf.call(markers, e.target) !== -1) {
        const targetCodeCountry = e.target.dataset.code;
        const paramsPopup = mapCountryIdentify(this.dataObj, targetCodeCountry, currentIndicator);
        const countryTarget = paramsPopup[0];
        this.mapCreator.mapFlyToCountry(countryTarget);
        this.table.createTableCountry(this.dataObj, countryTarget);
        this.state.country = countryTarget;
        searchInput.value = '';
      }
      if (Array.prototype.indexOf.call(btnGlobal, e.target) !== -1) {
        this.table.createTableLayout(this.dataObj);
        this.mapCreator.mapFlyOut();
        searchInput.value = '';
        this.state.country = null;
      }
      if (Array.prototype.indexOf.call(togglePer100k, e.target) !== -1) {
        this.state.isPer100k = !this.state.isPer100k;
        togglePer100k.forEach((el) => el.classList.toggle('toggle-active'));
        if (!this.state.country) {
          this.table.createTableLayout(this.dataObj, this.state.isPer100k);
        } else {
          this.table.createTableCountry(this.dataObj, this.state.country, this.state.isPer100k);
        }
        this.modules.countriesList
          .countriesContentChange(this.state.indicator, this.state.isPer100k);
      }
      this.mapCreator.markerResize(this.state.indicator, this.state.isPer100k);

      if (Array.prototype.indexOf.call(btnNext, e.target) !== -1) {
        const nextInd = changeIndicator(this.state.indicator, 'next', this.state.isToday);
        this.modules.countriesList.countriesContentChange(nextInd, this.state.isPer100k);
        this.state.indicator = nextInd;
        this.mapCreator.markerResize(this.state.indicator, this.state.isPer100k);
        display.forEach((el) => {
          const displayElem = el;
          displayElem.innerText = this.state.indicator;
        });
      }
      if (Array.prototype.indexOf.call(btnPrev, e.target) !== -1) {
        const prevInd = changeIndicator(this.state.indicator, 'prev', this.state.isToday);
        this.modules.countriesList.countriesContentChange(prevInd, this.state.isPer100k);
        this.state.indicator = prevInd;
        this.mapCreator.markerResize(this.state.indicator, this.state.isPer100k);
        display.forEach((el) => {
          const displayElem = el;
          displayElem.innerText = this.state.indicator;
        });
      }

      if (Array.prototype.indexOf.call(toggleToday, e.target) !== -1) {
        this.state.isToday = !this.state.isToday;
        toggleToday.forEach((el) => el.classList.toggle('toggle-active'));
        this.state.indicator = totalToToday(this.state.isToday, this.state.indicator);
        this.modules.countriesList
          .countriesContentChange(this.state.indicator, this.state.isPer100k);
        this.mapCreator.markerResize(this.state.indicator, this.state.isPer100k);
        if (!this.state.country) {
          this.table.createTableLayout(this.dataObj, this.state.isPer100k, this.state.isToday);
        } else {
          this.table
            .createTableCountry(this.dataObj, this.state
              .country, this.state.isPer100k, this.state.isToday);
        }
      }
    });

    searchInput.addEventListener('change', () => {
      if (this.dataObj.find((dataElem) => dataElem.country === searchInput.value)) {
        const countryTarget = searchInput.value;
        this.mapCreator.mapFlyToCountry(countryTarget);
        this.table.createTableCountry(this.dataObj, countryTarget);
        this.state.country = countryTarget;
      }
    });
  }
}
