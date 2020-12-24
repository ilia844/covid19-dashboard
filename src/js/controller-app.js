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

export default class ControllerApp {
  constructor() {
    this.data = new Data();
    this.mapCreator = new CreateMap();
    this.table = new Table();
    this.controlPanel = new ControlPanel();
  }

  modules = {
    pageCreator: null,
    countriesList: null,
    keyboard: null,
    search: null,
  }

  dataObj = null;

  currentState = {
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
    this.modules.countriesList.countriesContentRender(this.currentState.indicator, this.currentState.isPer100k);
    this.modules.search.createSearchFiled();
    this.table.createTableLayout(this.dataObj);
    this.mapCreator.createMap(this.dataObj);
    this.mapCreator.createLegendIcon();
    this.mapCreator.renderLegend();
    this.controlPanel.createAllControlPanels();
    this.mapEventHandler();
    this.modules.keyboard.init();
    this.globalEventHandler();
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
        const paramsPopup = mapCountryIdentify(this.dataObj, targetCodeCountry, this.currentState.indicator, this.currentState.isPer100k);
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
    const currentIndicator = this.currentState.indicator;
    window.addEventListener('click', (e) => {
      if (Array.prototype.indexOf.call(listItems, e.target) !== -1) {
        const countryTarget = e.target.innerText;
        this.mapCreator.mapFlyToCountry(countryTarget);
        this.table.createTableOneCountry(this.dataObj, countryTarget);
        this.currentState.country = countryTarget;
        searchInput.value = '';
      }
      if (Array.prototype.indexOf.call(markers, e.target) !== -1) {
        const targetCodeCountry = e.target.dataset.code;
        const paramsPopup = mapCountryIdentify(this.dataObj, targetCodeCountry, currentIndicator);
        const countryTarget = paramsPopup[0];
        this.mapCreator.mapFlyToCountry(countryTarget);
        this.table.createTableOneCountry(this.dataObj, countryTarget);
        this.currentState.country = countryTarget;
        searchInput.value = '';
      }
      if (Array.prototype.indexOf.call(btnGlobal, e.target) !== -1) {
        this.table.createTableLayout(this.dataObj);
        this.mapCreator.mapFlyOut();
        searchInput.value = '';
        this.currentState.country = null;
      }
      if (Array.prototype.indexOf.call(togglePer100k, e.target) !== -1) {
        this.currentState.isPer100k = !this.currentState.isPer100k;
        togglePer100k.forEach((el) => el.classList.toggle('toggle-active'));
        if (!this.currentState.country) {
          this.table.createTableLayout(this.dataObj, this.currentState.isPer100k);
        } else {
          this.table.createTableOneCountry(this.dataObj, this.currentState.country, this.currentState.isPer100k);
        }
        this.modules.countriesList.countriesContentChange(this.currentState.indicator, this.currentState.isPer100k);
      }
      this.mapCreator.markerResize(this.currentState.indicator, this.currentState.isPer100k);

      if (Array.prototype.indexOf.call(btnNext, e.target) !== -1) {
        const nextInd = changeIndicator(this.currentState.indicator, 'next', this.currentState.isToday);
        this.modules.countriesList.countriesContentChange(nextInd, this.currentState.isPer100k);
        this.currentState.indicator = nextInd;
        this.mapCreator.markerResize(this.currentState.indicator, this.currentState.isPer100k);
        display.forEach((el) => { el.innerText = this.currentState.indicator; });
      }
      if (Array.prototype.indexOf.call(btnPrev, e.target) !== -1) {
        const prevInd = changeIndicator(this.currentState.indicator, 'prev', this.currentState.isToday);
        this.modules.countriesList.countriesContentChange(prevInd, this.currentState.isPer100k);
        this.currentState.indicator = prevInd;
        this.mapCreator.markerResize(this.currentState.indicator, this.currentState.isPer100k);
        display.forEach((el) => { el.innerText = this.currentState.indicator; });
      }

      if (Array.prototype.indexOf.call(toggleToday, e.target) !== -1) {
        this.currentState.isToday = !this.currentState.isToday;
        toggleToday.forEach((el) => el.classList.toggle('toggle-active'));
        this.currentState.indicator = totalToToday(this.currentState.isToday, this.currentState.indicator);
        this.modules.countriesList.countriesContentChange(this.currentState.indicator, this.currentState.isPer100k);
        this.mapCreator.markerResize(this.currentState.indicator, this.currentState.isPer100k);
        if (!this.currentState.country) {
          this.table.createTableLayout(this.dataObj, this.currentState.isPer100k, this.currentState.isToday);
        } else {
          this.table.createTableOneCountry(this.dataObj, this.currentState.country, this.currentState.isPer100k, this.currentState.isToday);
        }
      }
    });

    searchInput.addEventListener('change', () => {
      if (this.dataObj.find((dataElem) => dataElem.country === searchInput.value)) {
        const countryTarget = searchInput.value;
        this.mapCreator.mapFlyToCountry(countryTarget);
        this.table.createTableOneCountry(this.dataObj, countryTarget);
        this.currentState.country = countryTarget;
      }
    });
  }
}
