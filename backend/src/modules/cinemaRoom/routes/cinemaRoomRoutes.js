const express = require('express');
const router = express.Router();
const CinemaRoomController = require('../controllers/CinemaRoomController');

router.post('/', CinemaRoomController.create);
router.get('/', CinemaRoomController.getAll);
router.get('/:id', CinemaRoomController.getById);
router.put('/:id', CinemaRoomController.update);
router.delete('/:id', CinemaRoomController.delete);

module.exports = router;
