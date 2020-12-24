import ModelChart from './model-chart';
import ViewChart from './view-chart';

export default class ControllerChart {
  constructor() {
    this.modelChart = new ModelChart();
    this.viewChart = new ViewChart();
  }

  createChart = () => {
    this.viewChart.createChart();
  }

  changeDimensions = (isPer100K, indicator) => {
    this.modelChart.updatePopulation()
      .then(() => {
        this.modelChart.prepareDataForChart(isPer100K);
        this.viewChart.generateChart(this.modelChart.getDataForChart(indicator));
      });
  }

  renderChart = async (country, isPer100K, indicator) => {
    await this.modelChart.updateData((!country ? 'all' : country), isPer100K);
    this.viewChart.generateChart(this.modelChart.getDataForChart(indicator));
  }

  changeChart = (indicator) => {
    this.viewChart.generateChart(this.modelChart.getDataForChart(indicator));
  }
}
