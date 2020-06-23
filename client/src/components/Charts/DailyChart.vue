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
		  title: "Personas"
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
  /*data: function() {
		return {
			aux: [],
			arraySeries: [],
		};
	},
	components: {
		apexchart: VueApexCharts
	},
	computed: {
		datos: function() {
			return {
				series: [
					{
						name: "Infectados",
						data: this.data
					}
				]
			};
		},
		options: function() {
			return {
				chart: {
					stacked: false,
					zoom : {
						enabled : false
					}
				},

				dataLabels: {
					enabled: false
				},
				
				markers: {
					size: 0,
					style: "full"
				},
				//colors: ['#0165fc'],

				xaxis: {
					type: "datetime",
					labels:{
						style: {
							colors : "#E3E4E5"
						}
					},
				},
				fill:{
					colors: ["#FFFFFF"]
				},
				yaxis : {
					labels:{
						style: {
							colors : "#E3E4E5"
						}
					},
				}

			};
        },
        
	},
	methods: {
	}*/
};
</script>
