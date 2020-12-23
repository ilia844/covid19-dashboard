import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import elements from './nls/pageLayoutElements';
import createElem from './utils/createElement';
import getSizeFromCount from './utils/mapMarkerSizeCounter';
import clearParentContainer from './utils/clearParentContainer';
import mapPopupBuild from './utils/mapPopupBuilder';
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
      center: [0, 0],
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
    const legendIcon = createElem('button', 'map-legend-icon', 'L');
    map.prepend(legendIcon);
  }

  renderMarker = (countryCode, count) => {
    const el = createElem('div', 'marker');
    el.setAttribute('data-code', countryCode);
    this.markerSizeControl(el, count, 'big');
    this.markers.push(el);
    return el;
  }

  renderLegend = (markingList) => {
    const legend = document.querySelector('.map-legend');
    clearParentContainer(legend);
    if (markingList === 'big' || !markingList) { legend.insertAdjacentHTML('afterbegin', elements.mapLegend.markingBig); }
    if (markingList === 'middle') { legend.insertAdjacentHTML('afterbegin', elements.mapLegend.markingMiddle); }
    if (markingList === 'small') { legend.insertAdjacentHTML('afterbegin', elements.mapLegend.markingSmall); }
  }

  renderPopup = (country, indicator, indicatorCount) => {
    const popup = document.querySelector('.mapboxgl-popup');
    clearParentContainer(popup);
    popup.insertAdjacentHTML('afterbegin', mapPopupBuild(country, indicator, indicatorCount));
  }

  controlMap = (currentCountry) => {
    const dataElement = this.data.find((e) => e.country === currentCountry);
    this.map.flyTo({
      center: [dataElement.countryInfo.long, dataElement.countryInfo.lat],
      zoom: 4,
      essential: true,
    });
  }

  markerResize = (indicator, isPerOneHundredThousands) => {
    let isLegendRendered = false;
    for (let i = 0; i < this.markers.length; i += 1) {
      const currentIndicatorCount = this.data[i][indicator];
      const currentMarker = this.markers[i];
      if ((indicator === 'cases' || indicator === 'deaths' || indicator === 'recovered') && !isPerOneHundredThousands) {
        this.markerSizeControl(currentMarker, currentIndicatorCount, 'big');
        if (!isLegendRendered) {
          this.renderLegend('big');
          isLegendRendered = true;
        }
      } else if ((indicator === 'todayCases' || indicator === 'todayDeaths' || indicator === 'todayRecovered') && isPerOneHundredThousands) {
        this.markerSizeControl(currentMarker, currentIndicatorCount, 'small');
        if (!isLegendRendered) {
          this.renderLegend('small');
          isLegendRendered = true;
        }
      } else {
        this.markerSizeControl(currentMarker, currentIndicatorCount, 'middle');
        if (!isLegendRendered) {
          this.renderLegend('middle');
          isLegendRendered = true;
        }
      }
    }
  }

  markerSizeControl = (marker, count, sizeNumbers) => {
    const size = getSizeFromCount(count, sizeNumbers);
    const currentMarker = marker.style;
    currentMarker.width = `${size}px`;
    currentMarker.height = `${size}px`;
  }

  mapControllerCreate = () => {
    const map = document.getElementById('map');
    map.insertAdjacentHTML('afterbegin', elements.mapController);
  }
}
