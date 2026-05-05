const express = require('express');
const router = express.Router();
const ShowtimeController = require('../controllers/ShowtimeController');

router.post('/', ShowtimeController.create);
router.get('/', ShowtimeController.getAll);
router.get('/:id', ShowtimeController.getById);
router.put('/:id', ShowtimeController.update);
router.delete('/:id', ShowtimeController.delete);

module.exports = router;
