import createElem from './utils/createElement';
import elements from './nls/pageLayoutElements';
import setCurrentData from './utils/setCurrentDate';
import createIcon from './utils/createIcon';

export default class CreatePageLayout {
  renderPageLayout = () => {
    const body = document.querySelector('body');

    const pageLayoutFrament = document.createDocumentFragment();

    const header = createElem('header', 'header');
    const headerContainer = createElem('div', 'header__container', `${elements.headerImg} ${elements.headerTitle} `);
    const currentDate = createElem('div', 'today');
    currentDate.textContent = setCurrentData();

    const main = createElem('main', 'main', elements.mainElements);
    const footer = createElem('footer', 'footer');
    const footerContainer = createElem('div', 'footer__container', elements.footerElements);

    footer.append(footerContainer);
    headerContainer.append(currentDate);
    header.append(headerContainer);
    pageLayoutFrament.append(header, main, footer);
    body.append(pageLayoutFrament);

    const containers = document.querySelectorAll('.container');
    containers.forEach((el) => {
      const button = createElem('div', 'full-screen__btn', createIcon('fullscreen'));
      el.append(button);
    });
  }
}
