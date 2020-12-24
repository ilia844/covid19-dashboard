import createElem from './utils/createElement';
// import createMaterialIcon from './utils/createIcon';
import translatePer100k from './utils/translatePer100k';

export default class CountriesList {
  constructor(data) {
    this.data = data;
  }

  listElements = {
    listContainer: null,
    listTitleInfo: null,
    listContent: null,
    listArray: [],
  }

  listContentSet = {
    cases: 'Total Cases',
    deaths: 'Total Deaths',
    recovered: 'Total Recovered',
    todayCases: 'Today Cases',
    todayDeaths: 'Today Deaths',
    todayRecovered: 'Today Recovered',
  }

  getDigitPer100K = (obj, prop) => {
    if (!prop || prop === '0') {
      return '0';
    }
    if (!obj.population || obj.population === '0') {
      return '0';
    }
    return Math.ceil((obj[prop] / obj.population) * 100000);
  }

  countriesWrapperRender = () => {
    this.listElements.listContainer = document.querySelector('.list');

    const listFragment = document.createDocumentFragment();

    // const listTitle = createElem('div', 'list__title');
    // eslint-disable-next-line max-len
    // const listLeftButton = createElem('div', 'list__left-button', createMaterialIcon('keyboard_arrow_left'));
    // eslint-disable-next-line max-len
    // const listRigthButton = createElem('div', 'list__rigth-button', createMaterialIcon('keyboard_arrow_right'));
    this.listElements.listTitleInfo = createElem('div', 'list__title-info');
    // listTitle.append(listLeftButton, this.listElements.listTitleInfo, listRigthButton);

    this.listElements.listContent = createElem('div', 'list__content');

    listFragment.append(this.listElements.listContent); // listTitle,
    this.listElements.listContainer.append(listFragment);
  }

  sortData = (prop, relative) => {
    if (relative) {
      this.data.sort((prev, next) => {
        if (this.getDigitPer100K(prev, prop) < this.getDigitPer100K(next, prop)) return 1;
        if (this.getDigitPer100K(prev, prop) > this.getDigitPer100K(next, prop)) return -1;
        return 0;
      });
    } else {
      this.data.sort((prev, next) => {
        if (prev[prop] < next[prop]) return 1;
        if (prev[prop] > next[prop]) return -1;
        return 0;
      });
    }
  }

  createListItem = (obj, prop, relative) => {
    const listItemFragment = document.createDocumentFragment();
    const listItem = createElem('div', 'list__item');

    const listItemFlag = createElem('img', 'list__item__flag');
    // listItemFlag.style.backgroundImage = `url('${obj.countryInfo.flag}')`;
    listItemFlag.src = obj.countryInfo.flag;
    const listItemCountry = createElem('div', 'list__item__country', obj.country);
    let listItemValue;
    if (relative) {
      listItemValue = createElem('div', 'list__item__value', `${this.getDigitPer100K(obj, prop)}`);
    } else {
      listItemValue = createElem('div', 'list__item__value', obj[prop]);
    }

    listItem.append(listItemFlag, listItemCountry, listItemValue);
    listItemFragment.append(listItem);
    this.listElements.listArray.push(listItem);
    return listItemFragment;
  }

  getListTitleInfo = (mode) => this.listContentSet[mode];

  countriesContentRender = (mode, relative) => {
    // const listContent = document.querySelector('.list__content');
    // clearParentContainer(listContent);
    if (relative) {
      this.sortData(mode, relative);
      this.listElements.listTitleInfo.innerHTML = `${this.getListTitleInfo(mode)} / 100K`;
      this.data.forEach((item) => {
        this.listElements.listContent.append(this.createListItem(item, mode, relative));
      });
    } else {
      this.sortData(mode);
      this.listElements.listTitleInfo.innerHTML = this.getListTitleInfo(mode);
      this.data.forEach((item) => {
        this.listElements.listContent.append(this.createListItem(item, mode));
      });
    }
  }

  countriesContentChange = (indicator, isPer100k) => {
    this.listElements.listArray.forEach((listElement) => {
      const countryItem = listElement.childNodes[1].innerHTML;
      // console.log(countryItem);
      const dataElement = this.data.find((elem) => elem.country === countryItem);
      let indicatorCount = dataElement[indicator];
      if (isPer100k) {
        indicatorCount = translatePer100k(indicatorCount, dataElement.population);
        listElement.lastChild.innerHTML = indicatorCount;
      } else {
        listElement.lastChild.innerHTML = indicatorCount;
      }
    });
  }
}
