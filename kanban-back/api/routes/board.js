const express = require('express');
const router = express.Router();

const boardController = require('../controllers/boardController');
const listController = require('../controllers/listController');
  
    // boardList Routes
    router.get('/', boardController.list_all_boards);
    router.post('/', boardController.create_a_board);

    router.get('/:boardId', listController.list_board_lists);
    router.post('/:boardId', listController.create_a_list);
  

  
  module.exports = router;