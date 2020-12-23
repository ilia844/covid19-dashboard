import CreatePageLayout from './createPageLayout';
import CountriesList from './countriesList';
// import clearParentContainer from './utils/clearParentContainer';
import Data from './data';
import CreateMap from './map';
import Keyboard from './keyboard';
import Search from './search';
import mapCountryIdentify from './utils/mapCountryIdentificator';
import Table from './table';
import ControlPanel from './controlPanel';

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
    indicator: 'recovered',
    isToday: false,
    isPer100k: false,
    country: 'Tanzania',
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
    this.modules.countriesList.countriesContentRender('recovered', true);
    this.modules.search.createSearchFiled();
    this.table.createTableLayout(this.dataObj);
    this.mapCreator.createMap(this.dataObj);
    this.mapCreator.createLegendIcon();
    this.mapCreator.renderLegend();
    this.controlPanel.createAllControlPanels();

    this.mapEventHandler();
    // this.mapChooseCountry();
    // this.mapRenderNewMarkers();
    // this.mapCreator.mapControllerCreate();
    this.modules.keyboard.init();
    this.globalEventHandler();
  }

  mapEventHandler = () => {
    const map = document.querySelector('.mapboxgl-map');
    const markers = document.querySelectorAll('.marker');
    const popup = document.querySelector('.mapboxgl-popup');
    const legendIcon = document.querySelector('.map-legend-icon');
    const legend = document.querySelector('.map-legend');
    const {
      indicator, isToday, isPer100k, country,
    } = this.currentState;

    map.addEventListener('mousemove', (e) => {
      if (Array.prototype.indexOf.call(markers, e.target) !== -1) {
        const targetCodeCountry = e.target.dataset.code;
        const paramsPopup = mapCountryIdentify(this.dataObj, targetCodeCountry, indicator);
        this.mapCreator.renderPopup(...paramsPopup); // ('country', 'indicator', 'indicatorCount');
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

  // Map Tests
  // mapChooseCountry() {
  //   const rightButton = document.querySelector('.btn-next');
  //   rightButton.addEventListener('click', () => {
  //     const { country } = this.currentState;
  //     this.mapCreator.controlMap(country);
  //   });
  // }

  globalEventHandler = () => {
    const btnGlobal = document.querySelector('.btn-global');
    const listItems = document.querySelectorAll('.list__item__country');
    const markers = document.querySelectorAll('.marker');
    let currentCountry = this.currentState.country;
    let currentIndicator = this.currentState.indicator;
    window.addEventListener('click', (e) => {
      if (Array.prototype.indexOf.call(listItems, e.target) !== -1) {
        // console.log(e.target);
        const countryTarget = e.target.innerText;
        this.mapCreator.mapFlyToCountry(countryTarget);
        this.table.createTableOneCountry(this.dataObj, countryTarget);
        currentCountry = countryTarget;
      }
      if (Array.prototype.indexOf.call(markers, e.target) !== -1) {
        // console.log(e.target);
        const targetCodeCountry = e.target.dataset.code;
        const paramsPopup = mapCountryIdentify(this.dataObj, targetCodeCountry, currentIndicator);
        const countryTarget = paramsPopup[0];
        this.mapCreator.mapFlyToCountry(countryTarget);
        this.table.createTableOneCountry(this.dataObj, countryTarget);
        currentCountry = countryTarget;
      }
      if (e.target === btnGlobal) {
        this.table.createTableLayout(this.dataObj);
        this.mapCreator.mapFlyOut();
      }
    });
  }

  // mapRenderNewMarkers() {
  //   const leftButton = document.querySelector('.list__left-button');
  //   leftButton.addEventListener('click', () => {
  //     this.mapCreator.markerResize('recovered', true);
  //   });
  // }

  // indicators = {
  //   cases: this.dataObj.cases,
  //   deaths: this.dataObj.deaths,
  //   recovered: this.dataObj.recovered,
  //   todayCases: this.dataObj.todayCases,
  //   todayDeaths: this.dataObj.todayDeaths,
  //   todayRecovered: this.dataObj.todayRecovered,
  //   casesPerOneHundredThousands: this.transInPerOneHundredThousands('cases'),
  //   deathsPerOneHundredThousands: this.transInPerOneHundredThousands('deaths'),
  //   recoveredPerOneHundredThousands: this.transInPerOneHundredThousands('recovered'),
  //   todayCasesPerOneHundredThousands: this.transInPerOneHundredThousands('todayCases'),
  //   todayDeathsPerOneHundredThousands: this.transInPerOneHundredThousands('todayDeaths'),
  //   todayRecoveredPerOneHundredThousands: this.transInPerOneHundredThousands('todayRecovered'),
  //   transInPerOneHundredThousands(prop) {
  //     return Math.ceil((this.dataObj[prop] / this.dataObj.population) * 100000);
  //   },
  // }
}
