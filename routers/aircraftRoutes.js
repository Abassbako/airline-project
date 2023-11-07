const { createAircraft, findAicraft, updateAircraft, deleteAircraft, getAircrafts } = require('../controllers/aircraftControllers');
const router = require('express').Router();

router.post('/book', createAircraft);
router.get('/find/:craftId', findAicraft);
router.get('/', getAircrafts);
router.put('/update/:_id', updateAircraft);
router.delete('/delete/:_id', deleteAircraft);

module.exports = router;