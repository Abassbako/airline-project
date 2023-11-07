const { createPassengers, findPassengers, updatePassenger, deletePassengers, getPassengers } = require('../controllers/passengerControllers');
const { Router } = require('express');

const router = Router();

router.post('/create', createPassengers);
router.get('/find/:passengerId', findPassengers);
router.get('/', getPassengers);
router.put('/update/:_id', updatePassenger);
router.delete('/delete/:_id', deletePassengers);

module.exports = router;