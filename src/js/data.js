import api from './api';

export default class Data {
  constructor() {
    this.currentData = null;
  }

  data = null;

  async load() {
    try {
      const response = await fetch(api.countries);
      this.data = await response.json();
      return this.data;
    } catch (error) {
      throw Error(error);
    }
  }
}
