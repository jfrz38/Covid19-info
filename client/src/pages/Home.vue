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
                  <h4 class="title">Employees Stats</h4>
                  <p class="category">New employees on 15th September, 2016</p>
                </md-card-header>
                <md-card-content>
                  <ordered-table table-header-color="orange"></ordered-table>
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
                </md-card-content>
              </md-card>
            </div>
            <!-- Abajo -->
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >
              <chart-card
                :chart-data="dailyConfirmed.data"
                :chart-options="dailyConfirmed.options"
                :chart-type="'Line'"
                data-background-color="blue"
              >
                <template slot="content">
                  <h4 class="title">Casos confirmados</h4>
                  <p class="category">
                    <!-- TODO: coger el aumento respecto al día anterior y si es >0% ponerlo rojo, sino ponerlo verde-->
                    <span class="text-success"
                      ><i class="fas fa-long-arrow-alt-up"></i> 55%
                    </span>
                    increase in today sales.
                  </p>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>access_time</md-icon>
                    Datos a {{ timestamp }}
                  </div>
                </template>
              </chart-card>
            </div>
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >
              <chart-card
                :chart-data="dailyRecovered.data"
                :chart-options="dailyRecovered.options"
                :chart-type="'Line'"
                data-background-color="green"
              >
                <template slot="content">
                  <h4 class="title">Personas curadas</h4>
                  <p class="category">
                    <!-- TODO: coger el aumento respecto al día anterior y si es >0% ponerlo rojo, sino ponerlo verde-->
                    <span class="text-success"
                      ><i class="fas fa-long-arrow-alt-up"></i> 55%
                    </span>
                    increase in today sales.
                  </p>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>access_time</md-icon>
                    Datos a {{ timestamp }}
                  </div>
                </template>
              </chart-card>
            </div>
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >
              <chart-card
                :chart-data="dailyDeaths.data"
                :chart-options="dailyDeaths.options"
                :chart-type="'Line'"
                data-background-color="red"
              >
                <template slot="content">
                  <h4 class="title">Personas fallecidas</h4>
                  <p class="category">
                    <!-- TODO: coger el aumento respecto al día anterior y si es >0% ponerlo rojo, sino ponerlo verde-->
                    <span class="text-success"
                      ><i class="fas fa-long-arrow-alt-up"></i> 55%
                    </span>
                    increase in today sales.
                  </p>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>access_time</md-icon>
                    Datos a {{ timestamp }}
                  </div>
                </template>
              </chart-card>
            </div>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
import countries from "../countries.json"
import axios from 'axios'
import Vue from 'vue'

import {
  StatsCard,
  ChartCard,
  OrderedTable
} from "@/components";

export default {
    components: {
    StatsCard,
    ChartCard,
    OrderedTable
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
        deaths:0
      },
      dailyConfirmed: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dailyRecovered: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dailyDeaths: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
    };
  },
  methods:{
    countrySelected(country){
      var self = this
      //Llamar a la api y coger datos del país seleccionado
      this.current_country.name = country.Name
      if(country.Name == "Global"){
        //Estadísticas globales
        //this.current_country.flag = "";
        this.current_country.capital = "N/A";
        this.current_country.area = "148.9M km2";
        this.current_country.continent = "N/A";
        this.current_country.nativeName = "N/A";
        this.current_country.flag = "@/assets/img/earth-icon.png"; //"https://i.gyazo.com/1e421019d67c4b8d1258652413d00e3a.png"

        console.log("asd antes");
        var newObj = {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[23, 4, 32, 3445, 33, 18, 4]],
        };
        //this.$set(this.dailyConfirmed, 'data',newObj);
        this.dailyConfirmed.data = newObj;
        //this.dailyConfirmed.data.series = [[23, 4, 32, 3445, 33, 18, 4]]
        console.log("asd después")
        //Población total
        axios.get('http://localhost:4000/covid/global/total-population')
        .then(response=> {
          self.current_country.population = response.data.population;
        }).catch(e=>{
          console.log("error = ",e);
          self.current_country.population = 0;
        })

        //Confirmados
        axios.get('http://localhost:4000/covid/global/confirmed')
        .then(response=> {
          console.log("response global confirmed = ",confirmed)
          self.current_country.confirmed = response.data.confirmed;
        }).catch(e=>{
          console.log("error = ",e);
          self.current_country.confirmed = 0;
        })
        //Recuperados
        axios.get('http://localhost:4000/covid/global/recovered')
        .then(response=> {
          self.current_country.recovered = response.data.recovered;
        }).catch(e=>{
          console.log("error = ",e);
          self.current_country.recovered = 0;
        })
        //Muertos
        axios.get('http://localhost:4000/covid/global/deaths')
        .then(response=> {
          self.current_country.deaths = response.data.deaths;
        }).catch(e=>{
          console.log("error = ",e);
          self.current_country.deaths = 0;
        })
      }else{
        //Estadísticas de un país en concreto
        this.loadData(country);
        //Confirmados
        axios.get('http://localhost:4000/covid/confirmed-people/'+country.Code)
        .then(response=> {
          self.current_country.confirmed = response.data.confirmed;
        }).catch(e=>{
          console.log("error = ",e);
          self.current_country.confirmed = 0;
        })
        //Curados
        axios.get('http://localhost:4000/covid/recover-people/'+country.Code)
        .then(response=> {
          self.current_country.recovered = response.data.recovered;
        }).catch(_=>{
          self.current_country.recovered = 0;
        })
        //Fallecidos
        axios.get('http://localhost:4000/covid/dead-people/'+country.Code)
        .then(response=> {
          self.current_country.deaths = response.data.deaths;
        }).catch(_=>{
          self.current_country.deaths = 0;
        })
      }
    },
    getDay(){
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const date = yesterday.getDate() + '-'+(yesterday.getMonth()+1)+'-'+yesterday.getFullYear();
      this.timestamp = date;
    },
    loadData(country){
      var self = this;
      //Bandera
      this.current_country.flag = "https://www.countryflags.io/"+(country.Code).toLowerCase()+"/flat/64.png";
      
      //Población
      axios.get('http://localhost:4000/covid/population/'+country.Code)
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

        }).catch(_=>{
          self.current_country.continent = "";
        })
      
    }
  },created(){
    this.getDay();
    this.total_countries = countries;
    this.total_countries.unshift({Name:"Global",Code:""});
    //Por defecto muestra España
    this.countrySelected({Name:"Spain",Code:"ES"});
  }
};
</script>
