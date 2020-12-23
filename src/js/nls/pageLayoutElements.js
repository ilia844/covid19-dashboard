import footerLinks from './footerLinks';

export default {
  headerInner: 'Covid19-Dashboard',
  mainElements: `
  <section class='container container_info'>Global cases</section>
  <section class='container container_table'>table</section>
  <section class='container list'></section>
  <section class='container container_list'></section>
  <section class='container container_map' id='map'>
  <div id="state-legend" class="map-legend"></div>
  <div class="mapboxgl-popup"></>
  </section>
  <section class='container container_chart'>chart</section>`,
  footerElements: `
  <a href='${footerLinks.author1}' target='_blank'><img class="footer__img" src="${footerLinks.gitHubImg}" alt="Author"></a>
  <a href='${footerLinks.author2}' target='_blank'><img class="footer__img" src="${footerLinks.gitHubImg}" alt="Author"></a>
  <a href='${footerLinks.author3}' target='_blank'><img class="footer__img" src="${footerLinks.gitHubImg}" alt="Author"></a>
  <a href='${footerLinks.author4}' target='_blank'><img class="footer__img" src="${footerLinks.gitHubImg}" alt="Author"></a>
  <span class="footer__year">2020</span>
  <a href='${footerLinks.school}' target='_blank'><img class="footer__img" src="${footerLinks.schoolImg}" alt="School"></a>`,
  mapLegend: {
    markingBig: `
    <h4>Confirmed</h4>
    <div><span></span>1,000,000 – 5,000,000</div>
    <div><span></span>500,000 – 1,000,000</div>
    <div><span></span>400,000 – 500,000</div>
    <div><span></span>250,000 – 400,000</div>
    <div><span></span>100,000 – 250,000</div>
    <div><span></span>50,000 – 100,000</div>
    <div><span></span>20,000 – 50,000</div>
    <div><span></span>3,000 – 20,000</div>
    <div><span></span>1,000 – 3,000</div>`,
    markingMiddle: `
    <h4>Confirmed</h4>
    <div><span></span>100,000 – 500,000</div>
    <div><span></span>50,000 – 100,000</div>
    <div><span></span>40,000 – 50,000</div>
    <div><span></span>25,000 – 40,000</div>
    <div><span></span>10,000 – 25,000</div>
    <div><span></span>5,000 – 10,000</div>
    <div><span></span>2,000 – 5,000</div>
    <div><span></span>300 – 2,000</div>
    <div><span></span>100 – 300</div>`,
    markingSmall: `
    <h4>Confirmed</h4>
    <div><span></span>10,000 – 50,000</div>
    <div><span></span>5,000 – 10,000</div>
    <div><span></span>4,000 – 5000</div>
    <div><span></span>2,500 – 4000</div>
    <div><span></span>1,000 – 2500</div>
    <div><span></span>500 – 1000</div>
    <div><span></span>200 – 500</div>
    <div><span></span>30 – 200</div>
    <div><span></span>10 – 30</div>`,
  },
};
