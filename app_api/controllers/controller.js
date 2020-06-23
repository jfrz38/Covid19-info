const mongoose = require('mongoose');
const global_model = mongoose.model('GlobalModel');
const countries_summary_model = mongoose.model('CountriesSummaryModel');
const metadata_model = mongoose.model('MetaDataModel');

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

  };
  const getDeathsByDaysFromCountry = (req,res) =>{

  };
  const getRecoveredByDaysFromCountry = (req,res) =>{

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
      console.log("pop = ",total)
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



  /*

  const readSummaryCountry = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    countries_summary_model
    .find({country: req.params.country})
    .exec((err, location) => {
      if (!location) {
        return res
          .status(404)
          .json({
            "message": "location not found" });
          } else if (err) {
            return res
                .status(404)
                .json(err);
          }
      res
        .status(200)
        .json(location);
    });
  };

  const readGlobalDeaths = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    metadata_model
      .find({})
      .exec((err, metadata) => {
        if (!metadata) {
          return res
            .status(404)
            .json({
              "message": "No hay datos"
            });
        } else if (err) {
          return res
            .status(404)
            .json(err);
        }
        console.log(metadata[0].last_date);
        countries_summary_model.
        find({
            date: metadata[0].last_date
          })
          .exec((err, summary) => {
            if (!summary) {
              return res
                .status(404)
                .json({
                  "message": "location not found"
                });
            } else if (err) {
              return res
                .status(404)
                .json(err);
            }
            var muertos = summary.reduce(function(suma,elemento){
              return suma + elemento.deaths;
            },0);
            res
              .status(200)
              .json({"deaths" : muertos});
  
          });
      });
  };

  const readGlobalConfirmed = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    metadata_model
      .find({})
      .exec((err, metadata) => {
        if (!metadata) {
          return res
            .status(404)
            .json({
              "message": "No hay datos"
            });
        } else if (err) {
          return res
            .status(404)
            .json(err);
        }
        console.log(metadata[0].last_date);
        countries_summary_model.
        find({
            date: metadata[0].last_date
          })
          .exec((err, summary) => {
            if (!summary) {
              return res
                .status(404)
                .json({
                  "message": "location not found"
                });
            } else if (err) {
              return res
                .status(404)
                .json(err);
            }
            var infectados = summary.reduce(function(suma,elemento){
              return suma + elemento.confirmed;
            },0);
            res
              .status(200)
              .json({"confirmed" : infectados});
  
          });
      });
  };

  const readGlobalRecovered = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    metadata_model
      .find({})
      .exec((err, metadata) => {
        if (!metadata) {
          return res
            .status(404)
            .json({
              "message": "No hay datos"
            });
        } else if (err) {
          return res
            .status(404)
            .json(err);
        }
        console.log(metadata[0].last_date);
        countries_summary_model.
        find({
            date: metadata[0].last_date
          })
          .exec((err, summary) => {
            if (!summary) {
              return res
                .status(404)
                .json({
                  "message": "location not found"
                });
            } else if (err) {
              return res
                .status(404)
                .json(err);
            }
            var recuperados = summary.reduce(function(suma,elemento){
              return suma + elemento.recovered;
            },0);
            res
              .status(200)
              .json({"recovered" : recuperados});
  
          });
      });
  };

  const readGlobalSummary = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    metadata_model
      .find({})
      .exec((err, metadata) => {
        if (!metadata) {
          return res
            .status(404)
            .json({
              "message": "No hay datos"
            });
        } else if (err) {
          return res
            .status(404)
            .json(err);
        }
        console.log(metadata[0].last_date);
        countries_summary_model.
        find({
            date: metadata[0].last_date
          })
          .exec((err, summary) => {
            if (!summary) {
              return res
                .status(404)
                .json({
                  "message": "location not found"
                });
            } else if (err) {
              return res
                .status(404)
                .json(err);
            }
            res
              .status(200)
              .json(summary);
  
          });
      });
  };
  */