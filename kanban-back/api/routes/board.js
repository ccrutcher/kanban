const express = require('express');
const router = express.Router();

const boardController = require('../controllers/boardController');
const listController = require('../controllers/listController');
  
    // boardList Routes
    router.get('/', boardController.list_all_boards);
    router.post('/', boardController.create_a_board);

    router.get('/:boardId', boardController.read_a_board);
    router.delete('/:boardId', boardController.delete_a_board);

    router.get('/:boardId/lists', listController.list_board_lists);
    router.post('/:boardId/lists', listController.create_a_list);
  

  
  module.exports = router;