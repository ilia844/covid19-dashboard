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
import clearParentContainer from './utils/clearParentContainer';

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

  listContainer = null;

  state = {
    indicator: 'cases',
    isToday: false,
    isPer100k: false,
    country: null,
  }

  controlElements = {
    searchInput: null,
    btnGlobal: null,
    togglePer100k: null,
    toggleToday: null,
    btnNext: null,
    btnPrev: null,
    listItems: null,
    markers: null,
    display: null,
  }

  mapElements = {
    map: null,
    markers: null,
    popup: null,
    legendIcon: null,
    legend: null,
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
    this.controlPanel.createAllControlPanels();
    this.initControlElements();
    this.initMapAndListElements();
    this.listenLegendClick();
    this.listenMousePopup();
    this.listenInputField();
    this.listenCountryList();
    this.listenControlButtons();
    this.modules.keyboard.init();
    this.chartController.createChart();
    this.chartController.renderChart('all', false, this.state.indicator);
    this.displayWorldGlobalCases();
  }

  listenMousePopup = () => {
    this.mapElements.map.addEventListener('mousemove', this.popupMouseHandler);
  }

  popupMouseHandler = (event) => {
    if (event.target.closest('.marker')) {
      const targetCodeCountry = event.target.dataset.code;
      const paramsPopup = mapCountryIdentify(this.dataObj, targetCodeCountry, this.state
        .indicator, this.state.isPer100k);
      this.mapCreator.renderPopup(...paramsPopup);
      this.mapElements.popup.classList.add('active');
    } else {
      this.mapElements.popup.classList.remove('active');
    }
  }

  legendClickHandler = (event) => {
    if (event.target.closest('.map-legend-icon')) {
      this.mapElements.legend.classList.toggle('active');
    } else {
      this.mapElements.legend.classList.remove('active');
    }
  }

  listenLegendClick = () => {
    this.mapElements.map.addEventListener('click', this.legendClickHandler);
  }

  initControlElements = () => {
    this.controlElements.searchInput = document.querySelector('.search__input');
    this.controlElements.btnGlobal = document.querySelectorAll('.btn-global');
    this.controlElements.togglePer100k = document.querySelectorAll('.toggle__per100k');
    this.controlElements.toggleToday = document.querySelectorAll('.toggle__today');
    this.controlElements.btnNext = document.querySelectorAll('.btn-next');
    this.controlElements.btnPrev = document.querySelectorAll('.btn-prev');
    this.controlElements.listItems = document.querySelectorAll('.list__item__country');
    this.controlElements.markers = document.querySelectorAll('.marker');
    this.controlElements.display = document.querySelectorAll('.display-current-indicator');
  }

  initMapAndListElements = () => {
    this.mapElements.map = document.querySelector('.mapboxgl-map');
    this.mapElements.markers = document.querySelectorAll('.marker');
    this.mapElements.popup = document.querySelector('.mapboxgl-popup');
    this.mapElements.legendIcon = document.querySelector('.map-legend-icon');
    this.mapElements.legend = document.querySelector('.map-legend');
    this.listContainer = document.querySelector('.list__content');
  }

  controlButtonHandler = (event) => {
    if (event.target.closest('.btn-global')) {
      this.setCountryState();
      this.updateTableContent();
      this.mapCreator.mapFlyOut();
      this.unlistenCountryList();
      this.updateCountriesListContent();
      this.listenCountryList();
      this.updateMapMarkersSize();
      this.displayWorldGlobalCases();
      this.chartController
        .renderChart(this.state.country, this.state.isPer100k, this.state.indicator);
    }
    if (event.target.closest('.toggle__today')) {
      this.state.isToday = !this.state.isToday;
      this.state.indicator = totalToToday(this.state.isToday, this.state.indicator);
      this.activateTodayButtons();
      this.unlistenCountryList();
      this.updateCountriesListContent();
      this.listenCountryList();
      this.updateTableContent();
      this.updateMapMarkersSize();
      this.chartController.changeChart(this.state.indicator);
    }
    if (event.target.closest('.toggle__per100k')) {
      this.state.isPer100k = !this.state.isPer100k;
      this.activatePer100kButtons();
      this.unlistenCountryList();
      this.updateCountriesListContent();
      this.listenCountryList();
      this.updateTableContent();
      this.updateMapMarkersSize();
      this.chartController.changeDimensions(this.state.isPer100k, this.state.indicator);
    }
    if (event.target.closest('.btn-next')) {
      this.state.indicator = changeIndicator(this.state.indicator, 'next', this.state.isToday);
      this.unlistenCountryList();
      this.updateCountriesListContent();
      this.listenCountryList();
      this.updateMapMarkersSize();
      this.updateControlPanelDisplays();
      this.chartController.changeChart(this.state.indicator);
    }
    if (event.target.closest('.btn-prev')) {
      this.state.indicator = changeIndicator(this.state.indicator, 'prev', this.state.isToday);
      this.unlistenCountryList();
      this.updateCountriesListContent();
      this.listenCountryList();
      this.updateMapMarkersSize();
      this.updateControlPanelDisplays();
      this.chartController.changeChart(this.state.indicator);
    }
    if (event.target.closest('.marker')) {
      const targetCodeCountry = event.target.dataset.code;
      const paramsPopup = mapCountryIdentify(this.dataObj, targetCodeCountry, this.state.indicator);
      const countryTarget = paramsPopup[0];
      this.mapCreator.mapFlyToCountry(countryTarget);
      this.table.createTableCountry(this.dataObj, countryTarget);
      this.setCountryState(countryTarget);
      this.goToListCountry(countryTarget);
      this.displayCountryGlobalCases(countryTarget);
      this.chartController
        .renderChart(this.state.country, this.state.isPer100k, this.state.indicator);
    }
  }

  listenControlButtons = () => {
    document.body.addEventListener('click', this.controlButtonHandler);
  }

  updateControlPanelDisplays = () => {
    this.controlElements.display.forEach((el) => {
      const displayElem = el;
      displayElem.innerText = this.state.indicator;
    });
  }

  clearInputField = () => {
    this.controlElements.searchInput.value = '';
  }

  setCountryState = (country) => {
    if (country) {
      this.state.country = country;
    } else {
      this.state.country = null;
    }
  }

  updateCountriesListContent = () => {
    clearParentContainer(this.listContainer);
    this.modules.countriesList.countriesContentRender(this.state.indicator, this.state.isPer100k);
  }

  updateMapMarkersSize = () => {
    this.mapCreator.markerResize(this.state.indicator, this.state.isPer100k);
  }

  activateTodayButtons = () => {
    if (this.state.isToday) {
      this.controlElements.toggleToday.forEach((el) => el.classList.add('toggle-active'));
    } else {
      this.controlElements.toggleToday.forEach((el) => el.classList.remove('toggle-active'));
    }
  }

  activatePer100kButtons = () => {
    if (this.state.isPer100k) {
      this.controlElements.togglePer100k.forEach((el) => el.classList.add('toggle-active'));
    } else {
      this.controlElements.togglePer100k.forEach((el) => el.classList.remove('toggle-active'));
    }
  }

  updateTableContent = () => {
    if (!this.state.country) {
      this.table.createTableLayout(this.dataObj, this.state.isPer100k, this.state.isToday);
    } else {
      this.table
        .createTableCountry(this.dataObj, this.state
          .country, this.state.isPer100k, this.state.isToday);
    }
  }

  searchInputHandler = () => {
    if (this.dataObj.find((elem) => elem.country
      === this.controlElements.searchInput.value)) {
      this.mapCreator.mapFlyToCountry(this.controlElements.searchInput.value);
      this.table.createTableCountry(this.dataObj, this.controlElements.searchInput.value);
      this.setCountryState(this.controlElements.searchInput.value);
      this.goToListCountry(this.controlElements.searchInput.value);
      this.displayCountryGlobalCases(this.controlElements.searchInput.value);
      this.clearInputField();
      this.chartController
        .renderChart(this.state.country, this.state.isPer100k, this.state.indicator);
    }
  }

  listenInputField = () => {
    this.controlElements.searchInput.addEventListener('change', this.searchInputHandler);
    document.querySelector('.search__btn').addEventListener('click', this.searchInputHandler);
  }

  goToListCountry = (countryTarget) => {
    this.controlElements.listItems = document.querySelectorAll('.list__item__country');
    this.controlElements.listItems.forEach((elem) => {
      if (elem.innerHTML === countryTarget) {
        elem.parentNode.scrollIntoView();
      }
    });
  }

  countryListItemHandler = (event) => {
    if (event.target.closest('.list__item__country')) {
      this.setCountryState(event.target.innerText);
      this.mapCreator.mapFlyToCountry(event.target.innerText);
      this.table.createTableCountry(this.dataObj, event.target.innerText);
      this.displayCountryGlobalCases(event.target.innerText);
      this.chartController
        .renderChart(this.state.country, this.state.isPer100k, this.state.indicator);
    }
  }

  listenCountryList = () => {
    this.listContainer.addEventListener('click', this.countryListItemHandler);
  }

  unlistenCountryList = () => {
    this.listContainer.removeEventListener('click', this.countryListItemHandler);
  }

  displayWorldGlobalCases() {
    const displayGlobal = document.querySelector('.container_info');
    const totalCases = this.dataObj.reduce((acc, dataElem) => acc + dataElem.cases, 0);
    displayGlobal.innerHTML = totalCases;
  }

  displayCountryGlobalCases(currentCountry) {
    const displayGlobal = document.querySelector('.container_info');
    const totalCases = this.dataObj.find((elem) => elem.country === currentCountry).cases;
    displayGlobal.innerHTML = totalCases;
  }
}
