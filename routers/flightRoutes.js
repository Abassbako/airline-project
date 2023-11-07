const express = require('express');
const { createFlight, findFlight, updateFlight, deleteFlight, getUsers } = require( '../controllers/flightControllers' );

const router = express.Router();

router.post('/book', createFlight);
router.get('/find/:flightId', findFlight);
router.get('/', getUsers);
router.put('/update/:_id', updateFlight);
router.delete('/delete/:_id', deleteFlight);

module.exports = router;