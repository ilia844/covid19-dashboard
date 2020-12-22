import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import elements from './nls/pageLayoutElements';
import createElem from './utils/createElement';
import sizeCounter from './utils/mapMarkerSizeCounter';
// import population from './nls/populationQuantity';

const API_KEY = 'pk.eyJ1Ijoidml0YWxpYnVyYWtvdSIsImEiOiJja2lzd2hhZTYwcDBuMnFzYzNhazFnbmJiIn0.mfrcB7xDMdW2jJSJqOqnUQ';

export default class Map {
  constructor() {
    this.map = '';
    this.data = '';
    this.markers = [];
    this.indicator = '';
  }

  createMap = (data) => {
    mapboxgl.accessToken = API_KEY;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 0.5,
      center: [0, 20],
    });
    this.data = data;
    data.forEach((dataElement) => {
      const countryId = dataElement.countryInfo.iso3;
      const { cases } = dataElement;
      const el = this.renderMarker(countryId, cases);

      new mapboxgl.Marker(el)
        .setLngLat([dataElement.countryInfo.long, dataElement.countryInfo.lat])
        .addTo(this.map);
    });
  }

  createLegendIcon = () => {
    const map = document.getElementById('map');
    const legendIcon = createElem('div', 'map-legend-icon');
    map.prepend(legendIcon);
  }

  renderMarker = (countryCode, count) => {
    const el = createElem('div', 'marker');
    el.setAttribute('data-code', countryCode);
    const size = sizeCounter.getSizeMaxCount(count);
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    this.markers.push(el);
    return el;
  }

  renderLegend = () => {
    const map = document.getElementById('map');
    map.insertAdjacentHTML('afterbegin', elements.mapLegend);
  }

  renderPopup = () => {
    const map = document.getElementById('map');
    map.insertAdjacentHTML('afterbegin', elements.mapPopup);
  }

  controlMap = (currentCountry) => {
    const dataElement = this.data.find((e) => e.country === currentCountry);
    this.map.flyTo({
      center: [dataElement.countryInfo.long, dataElement.countryInfo.lat],
      zoom: 4,
      essential: true,
    });
  }

  markerResize = (indicator) => {
    for (let i = 0; i < this.markers.length; i += 1) {
      let currentIndicatorCount = this.data[i].indicator;
      const currentMarker = this.markers[i].style;
      if (indicator === 'casesPerHundredThousands') {
        currentIndicatorCount = this.data[i].casesPerOneMillion / 10;
      } else if (indicator === 'deathsPerHundredThousands') {
        currentIndicatorCount = this.data[i].deathsPerOneMillion / 10;
      } else if (indicator === 'recoveredPerHundredThousands') {
        currentIndicatorCount = this.data[i].recoveredPerOneMillion / 10;
      }
      if (indicator === 'cases' || indicator === 'deaths' || indicator === 'recovered') {
        const size = sizeCounter.getSizeMaxCount(currentIndicatorCount);
        currentMarker.width = `${size}px`;
        currentMarker.height = `${size}px`;
      } else {
        const size = sizeCounter.getSizeMinCount(currentIndicatorCount);
        currentMarker.width = `${size}px`;
        currentMarker.height = `${size}px`;
      }
    }
  }
}
