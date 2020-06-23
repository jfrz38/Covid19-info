const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

//Países
//Total
router.get('/covid/confirmed-people/:iso',controller.getConfirmedFromCountry);
router.get('/covid/dead-people/:iso',controller.getDeathsFromCountry);
router.get('/covid/recover-people/:iso',controller.getRecoveredFromCountry);
router.get('/covid/population/:iso',controller.getCountryPopulation)
//Por días
router.get('/covid/confirmed-bydays/:iso',controller.getConfirmedByDaysFromCountry)
router.get('/covid/dead-bydays/:iso',controller.getDeathsByDaysFromCountry)
router.get('/covid/recover-bydays/:iso',controller.getRecoveredByDaysFromCountry)

//Global
//Total
router.get('/covid/global/population',controller.getGlobalPopulation)
router.get('/covid/global/confirmed',controller.getGlobalConfirmed)
router.get('/covid/global/recovered',controller.getGlobalRecovered)
router.get('/covid/global/deaths',controller.getGlobalDeaths)
router.get('/covid/global/countries-data',controller.getGlobalDataByCountries)
//Por días
router.get('/covid/global/confirmed-bydays',controller.getGlobalConfirmedByDays)
router.get('/covid/global/dead-bydays',controller.getGlobalDeathsByDays)
router.get('/covid/global/recover-bydays',controller.getGlobalRecoveredByDays)

module.exports = router;
