const { createReservation, findReservation, updateReservation, getReservations, deleteReservation } = require('../controllers/reservationControllers');
const { Router } = require('express');

const router = Router();

router.post('/create', createReservation); 
router.get('/find/:passengerId', findReservation);
router.get('/', getReservations);
router.put('/update/:_id', updateReservation);
router.delete('/delete/:_id', deleteReservation);

module.exports = router;
