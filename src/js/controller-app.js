import CreatePageLayout from './createPageLayout';
import CountriesList from './countriesList';
// import clearParentContainer from './utils/clearParentContainer';
import Data from './data';
import CreateMap from './createMap';

export default class ControllerApp {
  constructor() {
    this.data = new Data();
    this.mapCreator = new CreateMap();
  }

  modules = {
    pageCreator: null,
    countriesList: null,
  }

  dataObj = null;

  runModules = () => {
    this.modules.pageCreator = new CreatePageLayout();
    this.modules.countriesList = new CountriesList(this.dataObj);
  }

  async init() {
    this.dataObj = await this.data.load();
    this.runModules();
    this.modules.pageCreator.renderPageLayout();
    this.modules.countriesList.countriesWrapperRender();
    this.modules.countriesList.countriesContentRender('recovered', true);
    this.mapCreator.create();
  }
}
