const { Router } = require('express');
const { signUp } = require( '../controllers/userControllers' );

const router = Router();

router.post('/signUp', signUp);

module.exports = router;