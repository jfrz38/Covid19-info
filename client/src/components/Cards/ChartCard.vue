<template>
  <md-card>
    <md-card-header
      class="card-chart"
      :data-background-color="dataBackgroundColor" >
      <div :id="chartId" class="ct-chart"></div>
    </md-card-header>

    <md-card-content>
      <slot name="content"></slot>
    </md-card-content>

    <md-card-actions md-alignment="left">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>
<script>
export default {
  name: "chart-card",
  props: {
    chart:{
      type: Object,
      default: () => {
        return {
          data: {
            labels: [],
            series: []
          }
        };
      }
    },
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      chartId: "no-id",
      chartType: "Line"
    };
  },
  methods: {
    /***
     * Initializes the chart by merging the chart options sent via props and the default chart options
     */
    initChart(Chartist) {
      var chartIdQuery = `#${this.chartId}`;
      Chartist["Line"](chartIdQuery, this.chart.data, this.chart.options);
    },
    /***
     * Assigns a random id to the chart
     */
    updateChartId() {
      var currentTime = new Date().getTime().toString();
      var randomInt = this.getRandomInt(0, currentTime);
      this.chartId = `div_${randomInt}`;
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  mounted() {
    this.updateChartId();
    import("chartist").then(Chartist => {
      let ChartistLib = Chartist.default || Chartist;
      this.$nextTick(() => {
        this.initChart(ChartistLib);
      });
    });
  }
};
</script>
