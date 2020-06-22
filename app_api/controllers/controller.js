const mongoose = require('mongoose');
const modelo = mongoose.model('Model');
const modelosummary = mongoose.model('ModelSummary');
const modelometadata = mongoose.model('ModelMetaData');

const moment = require('moment');

  //Por país
  //Total
  const getConfirmedFromCountry = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelosummary
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
    modelosummary
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
    modelosummary
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
    modelosummary
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

  }

  //Total
  const getGlobalConfirmed = (req,res) =>{
    //Ordenar todos los datos por fecha y sumar el último de todos los países
    res.header('Access-Control-Allow-Origin', '*');
    modelosummary
    .find({},'confirmed')
    .sort({date:-1})
    /*.aggregate()
    .sort({date:-1})
    .group()*/
    .exec((err, country) => {
      if (country.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
      }
      console.log("res length= ",res.length)
      res
        .status(200)
        .json({"confirmed" : country[0].confirmed});        

    });
  };

  const getGlobalDeaths = (req,res) =>{

  };

  const getGlobalRecovered = (req,res) =>{

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
    getGlobalDeathsByDays
  }



  /*

  const readSummaryCountry = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelosummary
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
    modelometadata
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
        modelosummary.
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
    modelometadata
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
        modelosummary.
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
    modelometadata
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
        modelosummary.
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
    modelometadata
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
        modelosummary.
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