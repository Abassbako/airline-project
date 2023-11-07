const { newAirport, searchAirport, updateAirport, deleteAirport, getAirports } = require('../controllers/airportControllers');
const { Router } = require('express');

const router = Router();

router.post('/select', newAirport);
router.get('/search/:airportId', searchAirport);
router.get('/', getAirports);
router.put('/update/:_id', updateAirport);
router.delete('/delete/:_id', deleteAirport);

module.exports = router;