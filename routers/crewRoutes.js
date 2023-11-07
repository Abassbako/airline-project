const { Router } = require('express');
const { newCrew, findCrew, updateCrew, deleteCrew, getCrews} = require('../controllers/crewControllers');

const router = Router();

router.post('/new', newCrew);
router.get('/search/:crewId', findCrew);
router.get('/', getCrews);
router.put('/update/:_id', updateCrew);
router.delete('/delete/:_id', deleteCrew);

module.exports = router;