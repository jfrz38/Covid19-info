const mongoose = require('mongoose');
const global_model = mongoose.model('GlobalModel');
const countries_summary_model = mongoose.model('CountriesSummaryModel');
const metadata_model = mongoose.model('MetaDataModel');
const moment = require('moment');

  //Por país
  //Total
  const getConfirmedFromCountry = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({country_iso2s: req.params.iso})
    .sort({date:-1})
    .exec((err, country) => {
      if (country.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
      }
      res
        .status(200)
        .json({"confirmed" : country[0].confirmed});        

    });
  };

  const getDeathsFromCountry = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({country_iso2s: req.params.iso})
    .sort({date:-1})
    .exec((err, country) => {
      if (country.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
          }
      res
        .status(200)
        .json({"deaths" : country[0].deaths});        

    });
  };

  const getRecoveredFromCountry = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({country_iso2s: req.params.iso})
    .sort({date:-1})
    .exec((err, country) => {
      if (country.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
          }
      res
        .status(200)
        .json({"recovered" : country[0].recovered});        

    });
  };

  const getCountryPopulation = (req,res) => {
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({country_iso2s: req.params.iso})
    .sort({date:-1})
    .exec((err, country) => {
      if (country.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
          }
      res
        .status(200)
        .json({"population" : country[country.length-1].population});        

    });
  };

  //Por días
  const getConfirmedByDaysFromCountry = (req,res) =>{
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({country_iso2s: req.params.iso})
    .sort({date:-1})
    .limit(15)
    .exec((err, info) => {
      if (info.length == 0) {
        return res
          .status(404)
          .json({
            "message": "can't retrieve info from country "+req.params.iso });
          }
          var dates = []
          var confirmed = []
          info.forEach(element=>{
            var dd = String(element.date.getDate()).padStart(2, '0');
            var mm = String(element.date.getMonth() + 1).padStart(2, '0');
            dates.push(dd+"-"+mm)
            confirmed.push(element.confirmed)
          })

      res
        .status(200)
        .json({"dates" : dates.reverse(), "confirmed": confirmed.reverse()});        

    });
  };
  const getDeathsByDaysFromCountry = (req,res) =>{
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({country_iso2s: req.params.iso})
    .sort({date:-1})
    .limit(15)
    .exec((err, info) => {
      if (info.length == 0) {
        return res
          .status(404)
          .json({
            "message": "can't retrieve info from country "+req.params.iso });
          }
          var dates = []
          var deaths = []
          info.forEach(element=>{
            var dd = String(element.date.getDate()).padStart(2, '0');
            var mm = String(element.date.getMonth() + 1).padStart(2, '0');
            dates.push(dd+"-"+mm)
            deaths.push(element.deaths)
          })

      res
        .status(200)
        .json({"dates" : dates.reverse(), "deaths": deaths.reverse()});
    });  
  };

  const getRecoveredByDaysFromCountry = (req,res) =>{
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({country_iso2s: req.params.iso})
    .sort({date:-1})
    .limit(15)
    .exec((err, info) => {
      if (info.length == 0) {
        return res
          .status(404)
          .json({
            "message": "can't retrieve info from country "+req.params.iso });
          }
          var dates = []
          var recovered = []
          info.forEach(element=>{
            var dd = String(element.date.getDate()).padStart(2, '0');
            var mm = String(element.date.getMonth() + 1).padStart(2, '0');
            dates.push(dd+"-"+mm)
            recovered.push(element.recovered)
          })

      res
        .status(200)
        .json({"dates" : dates.reverse(), "recovered": recovered.reverse()});
    });
  };

  //Global
  const getGlobalPopulation = (req,res)=>{
    var date = new Date();
    date.setHours(date.getHours() - 6);
    date.setDate(date.getDate()-1)
    date.setUTCHours(0,0,0,0);
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({date:date})
    .exec((err, country) => {
      if (country.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
      }
      var total = 0
      country.forEach(element=>{
        total+=element.population === undefined? 0: element.population
      })
      res
        .status(200)
        .json({"population" : total});        

    });
  }

  //Total
  const getGlobalConfirmed = (req,res) =>{
    var date = new Date();
    date.setHours(date.getHours() - 6);
    date.setDate(date.getDate()-1)
    date.setUTCHours(0,0,0,0);
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({date:date})
    .exec((err, country) => {
      if (country.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
      }
      var total = 0
      country.forEach(element=>{
        total+=element.confirmed
      })
      res
        .status(200)
        .json({"confirmed" : total});        

    });
  };

  const getGlobalDeaths = (req,res) =>{
    var date = new Date();
    date.setHours(date.getHours() - 6);
    date.setDate(date.getDate()-1)
    date.setUTCHours(0,0,0,0);
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({date:date})
    .exec((err, country) => {
      if (country.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
      }
      var total = 0
      country.forEach(element=>{
        total+=element.deaths
      })
      res
        .status(200)
        .json({"deaths" : total});        

    });
  };

  const getGlobalRecovered = (req,res) =>{
    var date = new Date();
    date.setHours(date.getHours() - 6);
    date.setDate(date.getDate()-1)
    date.setUTCHours(0,0,0,0);
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({date:date})
    .exec((err, country) => {
      if (country.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
      }
      var total = 0
      country.forEach(element=>{
        total+=element.recovered
      })
      res
        .status(200)
        .json({"recovered" : total});        

    });
  };

  const getGlobalDataByCountries = (req,res) =>{
    //Devolver una lista de todos los países donde cada país es un array con los datos: ['ISO','confirmed','death']
    var date = new Date();
    date.setHours(date.getHours() - 6);
    date.setDate(date.getDate()-1)
    date.setUTCHours(0,0,0,0);
    res.header('Access-Control-Allow-Origin', '*');
    //global_model
    countries_summary_model
    .find({date:date})
    .exec((err, country) => {
      if (country.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
      }
      var data = []
      country.forEach(element=>{
        if(element.country == "France") element.country_iso2s[0] = "FR"
        if(element.country == "United Kingdom") element.country_iso2s[0] = "GB"
        if(element.country == "China") element.country_iso2s[0] = "CN"
        data.push([element.country_iso2s[0],element.confirmed,element.deaths])
      })
      
      res
        .status(200)
        .json({"data" : data});        

    });
  };

  //Por días
  const getGlobalConfirmedByDays = (req,res)=>{

  }
  const getGlobalRecoveredByDays = (req,res)=>{

  }
  const getGlobalDeathsByDays = (req,res)=>{

  }

  module.exports = {
    getConfirmedFromCountry,
    getRecoveredFromCountry,
    getDeathsFromCountry,
    getCountryPopulation,
    getGlobalPopulation,
    getGlobalConfirmed,
    getGlobalDeaths,
    getGlobalRecovered,
    getConfirmedByDaysFromCountry,
    getRecoveredByDaysFromCountry,
    getDeathsByDaysFromCountry,
    getGlobalConfirmedByDays,
    getGlobalRecoveredByDays,
    getGlobalDeathsByDays,
    getGlobalDataByCountries
  }