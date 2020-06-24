<template>
  <md-card>
    <apexchart type="line" :options="chartOptions" :series="series" />
    <md-card-content>
      <slot name="content"></slot>
    </md-card-content>

    <md-card-actions md-alignment="left">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
//import 'jquery-ui-dist/jquery-ui';

export default {
  name: "daily-chart",
  props: {
	  chart:{
      type: Object,
      default: () => {
        return {
          data: {
            labels: [],
            series: []
		  },
		  title: "Personas",
		  color: "#5dade2"
        };
      }
	}
  },
  components: {
		apexchart: VueApexCharts
	},
  data() {
    return {
      series: [
        {
          name: this.chart.title,
		  data: this.chart.data.series,
        },
      ],
      chartOptions: {
        chart: {
          height: Math.max(this.chart.data.series),
		  type: "line",
          zoom: {
            enabled: false,
		  }
		},
		colors: [this.chart.color],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
			categories: this.chart.data.labels
        },
      },
    };
  }
};
</script>
