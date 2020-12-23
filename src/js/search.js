import createElem from './utils/createElement';

export default class Search {
  constructor(data) {
    this.data = data;
  }

  header = null;

  searchElements = {
    searchContainter: null,
    searchInput: null,
    searchBtn: null,
    countriesList: null,
  };

  createSearchFiled = () => {
    this.header = document.querySelector('header');

    this.searchElements.searchContainter = createElem('div', 'search');
    this.searchElements.searchInput = createElem('input', 'search__input');
    this.searchElements.searchInput.setAttribute('type', 'text');
    this.searchElements.searchInput.setAttribute('list', 'countries');

    this.searchElements.searchBtn = createElem('button', 'search__btn');
    this.searchElements.countriesList = createElem('datalist');
    this.searchElements.countriesList.id = 'countries';

    this.searchElements.searchContainter.append(
      this.searchElements.searchInput,
      this.searchElements.countriesList,
      this.searchElements.searchBtn,
    );

    this.header.append(this.searchElements.searchContainter);
    const dataList = document.querySelector('#countries');

    this.data.forEach((el) => {
      const newOption = createElem('option');
      newOption.setAttribute('value', el.country);
      dataList.append(newOption);
    });
  }
}
