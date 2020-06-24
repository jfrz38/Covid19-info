<template>
  <div class="wrapper">
    <div class="sidebar">
        <div class="logo">
          <div class="simple-text logo-mini">
              <img :src="imgLogo" alt="" />
          </div>
          <a class="simple-text logo-normal"> Países </a>
        </div>

        <div class="sidebar-wrapper">
          <slot name="content"></slot>
          <md-list class="nav">

            <div  v-for="country_clicked of total_countries" v-bind:key="country_clicked.Name">
              <slot>
                <div>
                    <li class="md-list-item">
                      <div class="md-list-item-router md-list-item-container md-button-clean" @click="countrySelected(country_clicked)" >
                        <div class="md-list-item-content md-ripple">
                          <slot>
                            <p style="color:white">{{country_clicked.Name}}</p>
                          </slot>
                        </div>
                      </div>
                    </li>
                </div>
              </slot>
            </div>
          </md-list>
        </div>
      </div>
    <div>

    </div>
      <div class="main-panel">
        <div class="content">
          <div class="md-layout">
            <!-- Arriba -->
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25" >
              <stats-card >
                <template slot="header">
                  <img v-bind:src="current_country.flag">
                </template>

                <template slot="content">
                  <p class="category">País</p>
                  <h3 class="title">{{current_country.name}}</h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>date_range</md-icon>
                    Datos a {{ timestamp }}
                  </div>
                </template>
              </stats-card>
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25" >
              <stats-card data-background-color="blue">
                <template slot="header">
                  <md-icon>medical_services</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Confirmados</p>
                  <h3 class="title"> {{current_country.confirmed}} </h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>date_range</md-icon>
                    Datos a {{ timestamp }}
                  </div>
                </template>
              </stats-card>
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25" >
              <stats-card data-background-color="green">
                <template slot="header">
                  <md-icon>healing</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Curados</p>
                  <h3 class="title">{{current_country.recovered}}</h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>date_range</md-icon>
                    Datos a {{ timestamp }}
                  </div>
                </template>
              </stats-card>
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25" >
              <stats-card data-background-color="red">
                <template slot="header">
                  <md-icon>person_remove</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Fallecidos</p>
                  <h3 class="title">{{current_country.deaths}}</h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>date_range</md-icon>
                    Datos a {{ timestamp }}
                  </div>
                </template>
              </stats-card>
            </div>
            
            <!-- Medio -->
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-75" >
              <md-card>
                <md-card-header data-background-color="orange">
                  <h4 class="title">Mapa mundial</h4>
                </md-card-header>
                <md-card-content>
                  
                  <GChart style="width: 100%; height: 100%;"
                  :settings="{ packages: ['geochart'] }"
                  type="GeoChart"
                  :data="chartData"
                  :options="chartOptions"
                  :key="chartOptions.region"
                  />
                  

                </md-card-content>
              </md-card>
            </div>
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-25" >
              <md-card>
                <md-card-header data-background-color="orange">
                  <h4 class="title">Datos</h4>
                </md-card-header>
                <md-card-content>
                  <p> Capital: {{current_country.capital}}</p>
                  <p> Continent: {{current_country.continent}}</p>
                  <p> Area: {{current_country.area}}</p>
                  <p> Population: {{current_country.population}}</p>
                  <p> Native name: {{current_country.nativeName}}</p>
                  <p> Population density: {{current_country.populationDensity}} pop/km2</p>
                </md-card-content>
              </md-card>
            </div>
            <!-- Abajo -->
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >
              <daily-chart 
              :chart = dailyConfirmed
              :key="dailyConfirmed.country">
                <template slot="content">
                  <h4 class="title">Casos confirmados</h4>
                  <p class="category">
                    <span style="color:#5dade2">
                      <i class="fas fa-long-arrow-alt-up"></i> {{current_country.dailyConfirmedImprove.day}}%
                    </span>
                    increase in last day.
                  </p>
                  <p class="category">
                    <span style="color:#5dade2">
                      <i class="fas fa-long-arrow-alt-up"></i> {{current_country.dailyConfirmedImprove.month}}%
                    </span>
                    increase in last 15 days.
                  </p>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>access_time</md-icon>
                    Datos a {{ timestamp }}
                  </div>
                </template>
              </daily-chart>
            </div>
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >
              <daily-chart 
                :chart = dailyRecovered
                :key="dailyRecovered.country">
                  <template slot="content">
                    <h4 class="title">Personas curadas</h4>
                    <p class="category">
                    <span class="text-success">
                      <i class="fas fa-long-arrow-alt-up"></i> {{current_country.dailyRecoverImprove.day}}%
                    </span>
                    increase in last day.
                  </p>
                  <p class="category">
                    <span class="text-success">
                      <i class="fas fa-long-arrow-alt-up"></i> {{current_country.dailyRecoverImprove.month}}%
                    </span>
                    increase in last 15 days.
                  </p>
                  </template>

                  <template slot="footer">
                    <div class="stats">
                      <md-icon>access_time</md-icon>
                      Datos a {{ timestamp }}
                    </div>
                  </template>
              </daily-chart>
            </div>
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >
              <daily-chart 
                :chart = dailyDeaths
                :key="dailyDeaths.country">
                  <template slot="content">
                    <h4 class="title">Personas fallecidas</h4>
                    <p class="category">
                    <span style="color:#e74c3c">
                      <i class="fas fa-long-arrow-alt-up"></i> {{current_country.dailyDeathsImprove.day}}%
                    </span>
                    increase in last day.
                  </p>
                  <p class="category">
                    <span style="color:#e74c3c">
                      <i class="fas fa-long-arrow-alt-up"></i> {{current_country.dailyDeathsImprove.month}}%
                    </span>
                    increase in last 15 days.
                  </p>
                  </template>

                  <template slot="footer">
                    <div class="stats">
                      <md-icon>access_time</md-icon>
                      Datos a {{ timestamp }}
                    </div>
                  </template>
              </daily-chart>
            </div>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
import countries from "../countries.json"
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import dailyChart from '../components/Charts/DailyChart' 
import https from 'https';

import {
  StatsCard,
  //ChartCard,
} from "@/components";

export default {
  components: {
    StatsCard,
    //ChartCard,
    GChart,
    dailyChart
  },
  props: {
    imgLogo: {
      type: String,
      default: require("@/assets/img/earth-icon.png")
    }
  },
  data() {
    return {
      total_countries:[],
      selected_country: "Spain",
      timestamp: "",
      current_country: {
        name: "",
        continent: "",
        area: 0,
        capital: "",
        nativeName: "",
        shape: [],
        flag: "",
        population: 0,
        confirmed: 0,
        recovered:0,
        deaths:0,
        dailyRecoverImprove: {
          day: 0,
          month:0
        },
        dailyDeathsImprove: {
          day: 0,
          month:0
        },
        dailyConfirmedImprove: {
          day: 0,
          month:0
        },
        populationDensity: 0,
      },
      dailyConfirmed: {
        country: "",
        data: {
          labels: [],
          series: [],
        },
        title:"Confirmados",
        color:"#5dade2"
      },
      dailyRecovered: {
        country: "",
        data: {
          labels: [],
          series: [],
        },
        title:"Recuperados",
        color: "#2ecc71"
      },
      dailyDeaths: {
        country: "",
        data: {
          labels: [],
          series: [],
        },
        title:"Fallecidos",
        color: "#e74c3c"
      },
      chartData: [
          ['Country','Confirmed', 'Deaths'],
          [ 'ES', 0,0]
        ],
      chartOptions:{
          region:'world',
          legend:'none',
          backgroundColor: '#81d4fa',
      },
      apiConfig: {
          headers: {Authorization: ""}
        }
    };
  },
  methods:{
    async callJWT(){
      var token = await axios.get("http://localhost:4000/")
      if(token){
        this.apiConfig.headers.Authorization = 'Bearer '.concat(token.data.token);
      }
    },
    countrySelected(country){
      var self = this
      //Llamar a la api y coger datos del país seleccionado
      this.current_country.name = country.Name
      if(country.Name == "Global"){
        //Estadísticas globales
        this.chartData = [['Country','Confirmed', 'Deaths'],[ '', 0,0]]
        this.current_country.capital = "N/A";
        this.current_country.area = "148.9M km2";
        this.current_country.continent = "N/A";
        this.current_country.nativeName = "N/A";
        this.current_country.flag = "https://i.gyazo.com/1e421019d67c4b8d1258652413d00e3a.png"
        //"@/assets/img/earth-icon.png"; //"https://i.gyazo.com/1e421019d67c4b8d1258652413d00e3a.png"

        //Población total
        axios.get('http://localhost:4000/covid/global/population',this.apiConfig)
        .then(response=> {
            self.current_country.population = response.data.population;
            //Densidad de población
            self.current_country.populationDensity = (response.data.population/148900000).toFixed(2)
          }).catch(e=>{
            console.log("error = ",e);
            self.current_country.population = 0;
            self.current_country.populationDensity = 0;
          })

        //Confirmados
        axios.get('http://localhost:4000/covid/global/confirmed',this.apiConfig)
        .then(response=> {
          self.current_country.confirmed = response.data.confirmed;
        }).catch(e=>{
          console.log("error = ",e);
          self.current_country.confirmed = 0;
        })
        //Recuperados
        axios.get('http://localhost:4000/covid/global/recovered',this.apiConfig)
        .then(response=> {
          self.current_country.recovered = response.data.recovered;
        }).catch(e=>{
          console.log("error = ",e);
          self.current_country.recovered = 0;
        })
        //Muertos
        axios.get('http://localhost:4000/covid/global/deaths',this.apiConfig)
        .then(response=> {
          self.current_country.deaths = response.data.deaths;
        }).catch(e=>{
          console.log("error = ",e);
          self.current_country.deaths = 0;
        })

        //Datos del mapa
        axios.get('http://localhost:4000/covid/global/countries-data',this.apiConfig)
        .then(response=> {
          self.chartData =[['Country','Confirmed', 'Deaths']]
          response.data.data.forEach(element => {
            self.chartData.push(element)
          });
          self.chartOptions.region="world"
        }).catch(e=>{
          self.chartOptions.region="world"
        })

        //Datos por días

        //Confirmados
        axios.get('http://localhost:4000/covid/global/confirmed-bydays',this.apiConfig)
        .then(response=> {
          self.dailyConfirmed.data.labels = response.data.dates;
          self.dailyConfirmed.data.series = response.data.confirmed;
          self.dailyConfirmed.country = "Global"

          if(response.data.confirmed.length > 2){
            //Calcular mejora porcentual
            //Último día
            var lastTwo = response.data.confirmed.slice((response.data.confirmed.length - 2), response.data.confirmed.length)
            var improve = ((lastTwo[1]-lastTwo[0])/lastTwo[1])*100
            self.current_country.dailyConfirmedImprove.day = improve.toFixed(2)
            //Últimos 15 días
            var aux = response.data.confirmed
            improve = 0
            improve = ((aux[aux.length-1]-aux[0])/aux[aux.length-1])*100
            self.current_country.dailyConfirmedImprove.month = improve.toFixed(2)
          }else{
            self.current_country.dailyConfirmedImprove.day = 0;
            self.current_country.dailyConfirmedImprove.month = 0;
          }
        }).catch(_=>{
          self.dailyConfirmed.data.labels = [];
          self.dailyConfirmed.data.series = [];
          self.dailyConfirmed.country = "Global"
          self.current_country.dailyConfirmedImprove.day = 0;
          self.current_country.dailyConfirmedImprove.month = 0;
        })
        //Curados
        axios.get('http://localhost:4000/covid/global/recover-bydays',this.apiConfig)
        .then(response=> {
          self.dailyRecovered.data.labels = response.data.dates;
          self.dailyRecovered.data.series = response.data.recovered;
          self.dailyRecovered.country = "Global"
          if(response.data.recovered.length > 2){
            //Calcular mejora porcentual
            //Último día
            var lastTwo = response.data.recovered.slice((response.data.recovered.length - 2), response.data.recovered.length)
            var improve = ((lastTwo[1]-lastTwo[0])/lastTwo[1])*100
            self.current_country.dailyRecoverImprove.day = improve.toFixed(2)
            //Últimos 15 días
            var aux = response.data.recovered
            improve = 0
            improve = ((aux[aux.length-1]-aux[0])/aux[aux.length-1])*100
            self.current_country.dailyRecoverImprove.month = improve.toFixed(2)
          }else{
            self.current_country.dailyRecoverImprove.day = 0;
            self.current_country.dailyRecoverImprove.month = 0;
          }
        }).catch(_=>{
          self.dailyRecovered.data.labels = [];
          self.dailyRecovered.data.series = [];
          self.dailyRecovered.country = "Global"
          self.current_country.dailyRecoverImprove.day = 0;
          self.current_country.dailyRecoverImprove.month = 0;
        })
        //Fallecidos
        axios.get('http://localhost:4000/covid/global/dead-bydays',this.apiConfig)
        .then(response=> {
          self.dailyDeaths.data.labels = response.data.dates;
          self.dailyDeaths.data.series = response.data.deaths;
          self.dailyDeaths.country = "Global"
          if(response.data.deaths.length > 2){
            //Calcular mejora porcentual
            //Último día
            var lastTwo = response.data.deaths.slice((response.data.deaths.length - 2), response.data.deaths.length)
            var improve = ((lastTwo[1]-lastTwo[0])/lastTwo[1])*100
            self.current_country.dailyDeathsImprove.day = improve.toFixed(2)
            //Últimos 15 días
            var aux = response.data.deaths
            improve = 0
            improve = ((aux[aux.length-1]-aux[0])/aux[aux.length-1])*100
            self.current_country.dailyDeathsImprove.month = improve.toFixed(2)
          }else{
            self.current_country.dailyDeathsImprove.day = 0;
            self.current_country.dailyDeathsImprove.month = 0;
          }
        }).catch(_=>{
          self.dailyDeaths.data.labels = [];
          self.dailyDeaths.data.series = [];
          self.dailyDeaths.country = "Global"
          self.current_country.dailyDeathsImprove.day = 0;
          self.current_country.dailyDeathsImprove.month = 0;
        })
      }else{
        //Estadísticas de un país en concreto
        this.loadData(country);
        var promises = []
        this.chartData = [['Country','Confirmed', 'Deaths'],[ '', 0,0]]
        promises.push(new Promise(resolve=>{
          //Confirmados
          axios.get('http://localhost:4000/covid/confirmed-people/'+country.Code,this.apiConfig)
          .then(response=> {
            self.current_country.confirmed = response.data.confirmed;
            resolve(true)
          }).catch(e=>{
            self.current_country.confirmed = 0;
            resolve(false)
          })
        }))
        
        //Curados
        axios.get('http://localhost:4000/covid/recover-people/'+country.Code,this.apiConfig)
        .then(response=> {
          self.current_country.recovered = response.data.recovered;
        }).catch(_=>{
          self.current_country.recovered = 0;
        })

        promises.push(new Promise(resolve=>{
          //Fallecidos
          axios.get('http://localhost:4000/covid/dead-people/'+country.Code,this.apiConfig)
          .then(response=> {
            self.current_country.deaths = response.data.deaths;
            resolve(true)
          }).catch(_=>{
            self.current_country.deaths = 0;
            resolve(false)
          })
        }))
        
        //Por días
        //Confirmados
        axios.get('http://localhost:4000/covid/confirmed-bydays/'+country.Code,this.apiConfig)
        .then(response=> {
          self.dailyConfirmed.data.labels = response.data.dates;
          self.dailyConfirmed.data.series = response.data.confirmed;
          self.dailyConfirmed.country = country.Code

          if(response.data.confirmed.length > 2){
            //Calcular mejora porcentual
            //Último día
            var lastTwo = response.data.confirmed.slice((response.data.confirmed.length - 2), response.data.confirmed.length)
            var improve = ((lastTwo[1]-lastTwo[0])/lastTwo[1])*100
            self.current_country.dailyConfirmedImprove.day = improve.toFixed(2)
            //Últimos 15 días
            var aux = response.data.confirmed
            improve = 0
            improve = ((aux[aux.length-1]-aux[0])/aux[aux.length-1])*100
            self.current_country.dailyConfirmedImprove.month = improve.toFixed(2)
          }else{
            self.current_country.dailyConfirmedImprove.day = 0;
            self.current_country.dailyConfirmedImprove.month = 0;
          }
        }).catch(_=>{
          self.dailyConfirmed.data.labels = [];
          self.dailyConfirmed.data.series = [];
          self.dailyConfirmed.country = country.Code
          self.current_country.dailyConfirmedImprove.day = 0;
          self.current_country.dailyConfirmedImprove.month = 0;
        })
        //Curados
        axios.get('http://localhost:4000/covid/recover-bydays/'+country.Code,this.apiConfig)
        .then(response=> {
          self.dailyRecovered.data.labels = response.data.dates;
          self.dailyRecovered.data.series = response.data.recovered;
          self.dailyRecovered.country = country.Code
          if(response.data.recovered.length > 2){
            //Calcular mejora porcentual
            //Último día
            var lastTwo = response.data.recovered.slice((response.data.recovered.length - 2), response.data.recovered.length)
            var improve = ((lastTwo[1]-lastTwo[0])/lastTwo[1])*100
            self.current_country.dailyRecoverImprove.day = improve.toFixed(2)
            //Últimos 15 días
            var aux = response.data.recovered
            improve = 0
            improve = ((aux[aux.length-1]-aux[0])/aux[aux.length-1])*100
            self.current_country.dailyRecoverImprove.month = improve.toFixed(2)
          }else{
            self.current_country.dailyRecoverImprove.day = 0;
            self.current_country.dailyRecoverImprove.month = 0;
          }
        }).catch(_=>{
          self.dailyRecovered.data.labels = [];
          self.dailyRecovered.data.series = [];
          self.dailyRecovered.country = country.Code
          self.current_country.dailyRecoverImprove.day = 0;
          self.current_country.dailyRecoverImprove.month = 0;
        })
        //Fallecidos
        axios.get('http://localhost:4000/covid/dead-bydays/'+country.Code,this.apiConfig)
        .then(response=> {
          self.dailyDeaths.data.labels = response.data.dates;
          self.dailyDeaths.data.series = response.data.deaths;
          self.dailyDeaths.country = country.Code
          if(response.data.deaths.length > 2){
            //Calcular mejora porcentual
            //Último día
            var lastTwo = response.data.deaths.slice((response.data.deaths.length - 2), response.data.deaths.length)
            var improve = ((lastTwo[1]-lastTwo[0])/lastTwo[1])*100
            self.current_country.dailyDeathsImprove.day = improve.toFixed(2)
            //Últimos 15 días
            var aux = response.data.deaths
            improve = 0
            improve = ((aux[aux.length-1]-aux[0])/aux[aux.length-1])*100
            self.current_country.dailyDeathsImprove.month = improve.toFixed(2)
          }else{
            self.current_country.dailyDeathsImprove.day = 0;
            self.current_country.dailyDeathsImprove.month = 0;
          }
        }).catch(_=>{
          self.dailyDeaths.data.labels = [];
          self.dailyDeaths.data.series = [];
          self.dailyDeaths.country = country.Code
          self.current_country.dailyDeathsImprove.day = 0;
          self.current_country.dailyDeathsImprove.month = 0;
        })
        //Esperar al array de promesas
        Promise.all(promises).then(_=>{
          this.chartData[1][0] = country.Code;
          this.chartData[1][1] = this.current_country.confirmed;
          this.chartData[1][2] = this.current_country.deaths;
          this.chartOptions.region = country.Code;
        })
        
      }
    },
    getDay(){
      axios.get('http://localhost:4000/covid/info/last-date',this.apiConfig)
        .then(response=> {
          this.timestamp = response.data.last_date
      }).catch(_=>{
        //Cálculo de la fecha manualmente
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const date = yesterday.getDate() + '-'+(yesterday.getMonth()+1)+'-'+yesterday.getFullYear();
        this.timestamp = date;
      })
    },
    loadData(country){
      var self = this;
      //Bandera
      this.current_country.flag = "https://www.countryflags.io/"+(country.Code).toLowerCase()+"/flat/64.png";
      
      //Población
      axios.get('http://localhost:4000/covid/population/'+country.Code,this.apiConfig)
        .then(response=> {
          self.current_country.population = response.data.population;
        }).catch(_=>{
          self.current_country.population = 0;
        })

      //Demás datos
      axios.get('https://restcountries.eu/rest/v2/alpha/'+(country.Code).toLowerCase())
        .then(response=> {
          //Continente
          self.current_country.continent = response.data.region;
          //Área
          self.current_country.area = response.data.area + " km2";
          //Capital
          self.current_country.capital = response.data.capital;
          //Nombre nativo
          self.current_country.nativeName = response.data.nativeName;
          //Densidad de población
          self.current_country.populationDensity = (response.data.population/response.data.area).toFixed(2)
        }).catch(_=>{
          self.current_country.continent = "";
          self.current_country.area = "0 km2";
          self.current_country.capital = "";
          self.current_country.nativeName = "";
          self.current_country.populationDensity = ""
        })
      
    }
  },created(){
    this.callJWT().then(_=>{
      this.getDay();
      this.total_countries = countries;
      this.total_countries.unshift({Name:"Global",Code:""});
      //Por defecto muestra Global
      this.countrySelected({Name:"Global",Code:""});
    })
    
  }
};
</script>
    
    
