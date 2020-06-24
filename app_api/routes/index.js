const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
var middleware = require('../controllers/middleware'); 
var ctrlAuth = require('../controllers/auth'); 

//Auth
router.get('/',ctrlAuth.goInto)

//Países
//Total
router.get('/covid/confirmed-people/:iso',middleware.ensureAuthenticated, controller.getConfirmedFromCountry);
router.get('/covid/dead-people/:iso',middleware.ensureAuthenticated, controller.getDeathsFromCountry);
router.get('/covid/recover-people/:iso',middleware.ensureAuthenticated, controller.getRecoveredFromCountry);
router.get('/covid/population/:iso',middleware.ensureAuthenticated, controller.getCountryPopulation)
//Por días
router.get('/covid/confirmed-bydays/:iso',middleware.ensureAuthenticated, controller.getConfirmedByDaysFromCountry)
router.get('/covid/dead-bydays/:iso',middleware.ensureAuthenticated, controller.getDeathsByDaysFromCountry)
router.get('/covid/recover-bydays/:iso',middleware.ensureAuthenticated, controller.getRecoveredByDaysFromCountry)

//Global
//Total
router.get('/covid/global/population',middleware.ensureAuthenticated, controller.getGlobalPopulation)
router.get('/covid/global/confirmed',middleware.ensureAuthenticated, controller.getGlobalConfirmed)
router.get('/covid/global/recovered',middleware.ensureAuthenticated, controller.getGlobalRecovered)
router.get('/covid/global/deaths',middleware.ensureAuthenticated, controller.getGlobalDeaths)
router.get('/covid/global/countries-data',middleware.ensureAuthenticated, controller.getGlobalDataByCountries)
//Por días
router.get('/covid/global/confirmed-bydays',middleware.ensureAuthenticated, controller.getGlobalConfirmedByDays)
router.get('/covid/global/dead-bydays',middleware.ensureAuthenticated, controller.getGlobalDeathsByDays)
router.get('/covid/global/recover-bydays',middleware.ensureAuthenticated, controller.getGlobalRecoveredByDays)

//Metadata
router.get('/covid/info/last-date',middleware.ensureAuthenticated, controller.getLastDate)

module.exports = router;
