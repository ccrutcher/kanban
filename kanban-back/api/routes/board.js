const express = require('express');
const router = express.Router();

const boardController = require('../controllers/boardController');
  
    // board routes
    router.get('/:boardId', boardController.get_board);
    router.post('/createBoard', boardController.create_a_board);
    router.delete('/:boardId', boardController.delete_a_board);
  
  module.exports = router;