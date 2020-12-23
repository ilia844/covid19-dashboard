import createElem from './utils/createElement';
import elements from './nls/pageLayoutElements';

export default class CreatePageLayout {
  renderPageLayout = () => {
    const body = document.querySelector('body');

    const pageLayoutFrament = document.createDocumentFragment();

    const headerTitle = createElem('h1', 'header__title', elements.headerInner);
    const header = createElem('header', 'header');
    const main = createElem('main', 'main', elements.mainElements);
    const footer = createElem('footer', 'footer');
    const footerContainer = createElem('div', 'footer__container', elements.footerElements);

    footer.append(footerContainer);
    header.append(headerTitle);
    pageLayoutFrament.append(header, main, footer);
    body.append(pageLayoutFrament);
  }
}
