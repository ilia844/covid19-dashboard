import CreateElement from './createElement';

export default class CreatePageLayout {
  elementCreator = new CreateElement();

  elements = {
    headerInner: 'Covid19-Dashboard',
    mainElements: `
    <section class='container container_info'>Global cases</section>
    <section class='container container_table'>table</section>
    <section class='container container_list'>list</section>
    <section class='container container_map'>map</section>
    <section class='container container_chart'>chart</section>`,
    footerElements: `<a href='#' target='_blank'>Author <img src="" alt=""></a>
    <a href='#' target='_blank'>Author <img src="" alt=""></a>
    <a href='#' target='_blank'>Author <img src="" alt=""></a>
    <a href='#' target='_blank'>Author <img src="" alt=""></a>
    <a href='#' target='_blank'>School <img src="" alt=""></a>`,
  }

  renderPageLayout = () => {
    const body = document.querySelector('body');

    const pageLayoutFrament = document.createDocumentFragment();

    const headerTitle = this.elementCreator.createElem('h1', 'header__title', this.elements.headerInner);

    const header = this.elementCreator.createElem('header', 'header');
    const main = this.elementCreator.createElem('main', 'main', this.elements.mainElements);
    const footer = this.elementCreator.createElem('footer', 'footer', this.elements.footerElements);

    header.append(headerTitle);
    pageLayoutFrament.append(header, main, footer);
    body.append(pageLayoutFrament);
  }
}
