const urls = {
  baseUrl: 'https://corona.lmao.ninja/v2/countries',
};

export default class Data {
  constructor() {
    this.currentData = null;
  }

  data = null;

  async load() {
    try {
      const response = await fetch(urls.baseUrl);
      this.data = await response.json();
      return this.data;
    } catch (error) {
      throw Error(error);
    }
  }
}
