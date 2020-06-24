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
    res.header('Access-Control-Allow-Origin', '*');
    const agg = [
      {
        '$match': {
          'country_iso2s': req.params.iso
        }
      }, {
        '$sort': {
          'date': -1
        }
      }, {
        '$limit': 15
      }, {
        '$group': {
          '_id': null, 
          'confirmed': {
            '$push': '$confirmed'
          }, 
          'dates': {
            '$push': {
              '$dateToString': {
                'format': '%d-%m', 
                'date': '$date'
              }
            }
          }
        }
      }
    ];
    countries_summary_model
      .aggregate(agg, (err, result)=>{
        if(result.length == 0){
          return res
            .status(404)
            .json({
              "message": "Can't retrieve data by days for "+req.params.iso });
        }
        result[0].dates.forEach(element=>{

        })
        res
          .status(200)
          .json({"dates" : result[0].dates.reverse(), "confirmed": result[0].confirmed.reverse()});
      })
  };

  const getDeathsByDaysFromCountry = (req,res) =>{
    res.header('Access-Control-Allow-Origin', '*');
    const agg = [
      {
        '$match': {
          'country_iso2s': req.params.iso
        }
      }, {
        '$sort': {
          'date': -1
        }
      }, {
        '$limit': 15
      }, {
        '$group': {
          '_id': null, 
          'deaths': {
            '$push': '$deaths'
          }, 
          'dates': {
            '$push': {
              '$dateToString': {
                'format': '%d-%m', 
                'date': '$date'
              }
            }
          }
        }
      }
    ];
    countries_summary_model
      .aggregate(agg, (err, result)=>{
        if(result.length == 0){
          return res
            .status(404)
            .json({
              "message": "Can't retrieve data by days for "+req.params.iso });
        }
        res
          .status(200)
          .json({"dates" : result[0].dates.reverse(), "deaths": result[0].deaths.reverse()});
      })
  };

  const getRecoveredByDaysFromCountry = (req,res) =>{
    res.header('Access-Control-Allow-Origin', '*');
    const agg = [
      {
        '$match': {
          'country_iso2s': req.params.iso
        }
      }, {
        '$sort': {
          'date': -1
        }
      }, {
        '$limit': 15
      }, {
        '$group': {
          '_id': null, 
          'recovered': {
            '$push': '$recovered'
          }, 
          'dates': {
            '$push': {
              '$dateToString': {
                'format': '%d-%m', 
                'date': '$date'
              }
            }
          }
        }
      }
    ];
    countries_summary_model
      .aggregate(agg, (err, result)=>{
        if(result.length == 0){
          return res
            .status(404)
            .json({
              "message": "Can't retrieve data by days for "+req.params.iso });
        }
        res
          .status(200)
          .json({"dates" : result[0].dates.reverse(), "recovered": result[0].recovered.reverse()});
      })
  };

  //Global
  const getGlobalPopulation = (req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    getLastDateFromDB().then(date=>{
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
    })
    
  }

  //Total
  const getGlobalConfirmed = (req,res) =>{
    res.header('Access-Control-Allow-Origin', '*');
    getLastDateFromDB().then(date=>{
      const agg = [
        {
          '$match': {
            'date': date
          }
        }, {
          '$group': {
            '_id': null, 
            'totalConfirmed': {
              '$sum': '$confirmed'
            }
          }
        }
      ];
      countries_summary_model
      .aggregate(agg, (err, result)=>{
        if(result.length == 0){
          return res
            .status(404)
            .json({
              "message": "Can't retrieve global confirmed" });
        }
        res
          .status(200)
          .json({"confirmed" : result[0].totalConfirmed});  
      })
    })
  };

  const getGlobalDeaths = (req,res) =>{
    res.header('Access-Control-Allow-Origin', '*');
    getLastDateFromDB().then(date=>{
      const agg = [
        {
          '$match': {
            'date': date
          }
        }, {
          '$group': {
            '_id': null, 
            'totalDeaths': {
              '$sum': '$deaths'
            }
          }
        }
      ];
      countries_summary_model
      .aggregate(agg, (err, result)=>{
        if(result.length == 0){
          return res
            .status(404)
            .json({
              "message": "Can't retrieve global deaths" });
        }
        res
          .status(200)
          .json({"deaths" : result[0].totalDeaths});  
      })
    })
  };

  const getGlobalRecovered = (req,res) =>{
    getLastDateFromDB().then(date=>{
      res.header('Access-Control-Allow-Origin', '*');
      const agg = [
        {
          '$match': {
            'date': date
          }
        }, {
          '$group': {
            '_id': null, 
            'totalRecovered': {
              '$sum': '$recovered'
            }
          }
        }
      ];
      countries_summary_model
      .aggregate(agg, (err, result)=>{
        if(result.length == 0){
          return res
            .status(404)
            .json({
              "message": "Can't retrieve global recovered" });
        }
        res
          .status(200)
          .json({"recovered" : result[0].totalRecovered});  
      })
    })
  };

  const getGlobalDataByCountries = (req,res) =>{
    getLastDateFromDB().then(date=>{
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
    })
  };

  //Por días
  const getGlobalConfirmedByDays = (req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    const agg = [
        {
        '$group': {
          '_id': {
            'date': '$date'
          }, 
          'date': {
            '$addToSet': {
              '$dateToString': {
                'format': '%d-%m', 
                'date': '$date'
              }
            }
          }, 
          'totalConfirmed': {
            '$sum': '$confirmed'
          }
        }
      }, {
        '$sort': {
          '_id': -1
        }
      }, {
        '$limit': 15
      }
    ];
    countries_summary_model
    .aggregate(agg, (err, result)=>{
      if(result.length == 0){
        return res
          .status(404)
          .json({
            "message": "Can't retrieve global confirmed by days" });
      }
      var confirmed = []
      var dates = []
      result.map(r=>{
        confirmed.push(r.totalConfirmed)
        dates.push(r.date[0])
      })
      res
        .status(200)
        .json({"dates" : dates.reverse(), "confirmed": confirmed.reverse()}); 
    })
  }

  const getGlobalRecoveredByDays = (req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    const agg = [
        {
        '$group': {
          '_id': {
            'date': '$date'
          }, 
          'date': {
            '$addToSet': {
              '$dateToString': {
                'format': '%d-%m', 
                'date': '$date'
              }
            }
          }, 
          'totalRecovered': {
            '$sum': '$recovered'
          }
        }
      }, {
        '$sort': {
          '_id': -1
        }
      }, {
        '$limit': 15
      }
    ];
    countries_summary_model
    .aggregate(agg, (err, result)=>{
      if(result.length == 0){
        return res
          .status(404)
          .json({
            "message": "Can't retrieve global recovered by days" });
      }
      var recovered = []
      var dates = []
      result.map(r=>{
        recovered.push(r.totalRecovered)
        dates.push(r.date[0])
      })
      res
        .status(200)
        .json({"dates" : dates.reverse(), "recovered": recovered.reverse()}); 
    })
  }

  const getGlobalDeathsByDays = (req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    const agg = [
        {
        '$group': {
          '_id': {
            'date': '$date'
          }, 
          'date': {
            '$addToSet': {
              '$dateToString': {
                'format': '%d-%m', 
                'date': '$date'
              }
            }
          }, 
          'totalDeaths': {
            '$sum': '$deaths'
          }
        }
      }, {
        '$sort': {
          '_id': -1
        }
      }, {
        '$limit': 15
      }
    ];
    countries_summary_model
    .aggregate(agg, (err, result)=>{
      if(result.length == 0){
        return res
          .status(404)
          .json({
            "message": "Can't retrieve global deaths by days" });
      }
      var deaths = []
      var dates = []
      result.map(r=>{
        deaths.push(r.totalDeaths)
        dates.push(r.date[0])
      })
      res
        .status(200)
        .json({"dates" : dates.reverse(), "deaths": deaths.reverse()}); 
    })
  }


  //MetaData
  const getLastDate = (req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    metadata_model
    .find()
    .exec((err, doc) => {
      if(doc.length == 0){
        return res
        .status(404)
        .json({
          "message": "Can't load last date" });
      }
      var date = doc[0].last_date
      var formatDate = date.getDate() + '-'+(date.getMonth()+1)+'-'+date.getFullYear();
      res
        .status(200)
        .json({"last_date" : formatDate});  
    })
  }

  async function getLastDateFromDB(){
    return new Promise(resolve=>{
      metadata_model
      .find()
      .exec((err,doc)=>{
        if(doc.length == 0) resolve(new Date());
        else resolve(doc[0].last_date)
      })
    })
    
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
    getGlobalDataByCountries,
    getLastDate
  }