import createElem from './utils/createElement';
import elements from './nls/pageLayoutElements';
<<<<<<< HEAD
import setCurrentData from './utils/setCurrentDate';
import createIcon from './utils/createIcon';
=======
import setCurrentDate from './utils/setCurrentDate';
>>>>>>> 35d82a7... refact: rewrite controller, fix bugs

export default class CreatePageLayout {
  renderPageLayout = () => {
    const body = document.querySelector('body');

    const pageLayoutFrament = document.createDocumentFragment();

    const header = createElem('header', 'header');
    const headerContainer = createElem('div', 'header__container', `${elements.headerImg} ${elements.headerTitle} `);
    const currentDate = createElem('div', 'today');
    const todayData = createElem('div', '', `${setCurrentDate()}`);
    const dataProvide = createElem('div', '', 'Data provided for the year');
    currentDate.append(todayData, dataProvide);

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
