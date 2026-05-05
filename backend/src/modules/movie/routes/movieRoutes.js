const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/MovieController');

router.post('/', MovieController.create);
router.get('/', MovieController.getAll);
router.get('/:id', MovieController.getById);
router.put('/:id', MovieController.update);
router.delete('/:id', MovieController.delete);

module.exports = router;
