import CreatePageLayout from './createPageLayout';

export default class ControllerApp {
  pageCreator = new CreatePageLayout();

  init = () => {
    this.pageCreator.renderPageLayout();
  }
}
