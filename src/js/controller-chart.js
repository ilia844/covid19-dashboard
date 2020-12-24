import ModelChart from './model-chart';
import ViewChart from './view-chart';

export default class ControllerChart {
  constructor() {
    this.modelChart = new ModelChart();
    this.viewChart = new ViewChart();
  }

  createChart = () => {
    this.viewChart.createChart();
    // this.viewChart.createSliderBar();

    // document.querySelector('.chart-right-btn')
    //   .addEventListener('click', this.nextChart);
    // document.querySelector('.chart-left-btn')
    //   .addEventListener('click', this.prevChart);
  }

  nextChart = () => {
    const nextIndex = this.modelChart.getNextIndex();
    this.viewChart.generateChart(this.modelChart.getDataForChart(nextIndex));
  }

  prevChart = () => {
    const prevIndex = this.modelChart.getPreviousIndex();
    this.viewChart.generateChart(this.modelChart.getDataForChart(prevIndex));
  }

  renderChart = async (country, isPer100K = false) => {
    await this.modelChart.updateData(country, isPer100K);
    this.viewChart.generateChart(this.modelChart.getDataForChart('cumulativeRecovered'));
  }

  changeChart = (index) => {
    this.viewChart.generateChart(this.modelChart.getDataForChart(index));
  }

  updateChart = async (country, isPer100K = false) => {
    await this.modelChart.updateData(country, isPer100K);
    this.modelChart.prepareDataForChart();
  }
}
