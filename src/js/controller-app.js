import CreatePageLayout from './createPageLayout';
import CountriesList from './countriesList';
// import clearParentContainer from './utils/clearParentContainer';
import Data from './data';

export default class ControllerApp {
  constructor() {
    this.data = new Data();
  }

  modules = {
    pageCreator: null,
    countriesList: null,
  }

  json = null;

  runModules = () => {
    this.modules.pageCreator = new CreatePageLayout();
    this.modules.countriesList = new CountriesList(this.json);
  }

  async init() {
    this.json = await this.data.load();
    this.runModules();
    this.modules.pageCreator.renderPageLayout();
    this.modules.countriesList.countriesWrapperRender();
    this.modules.countriesList.countriesContentRender('deaths', 'per100K');
  }
}
