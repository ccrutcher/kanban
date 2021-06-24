const express = require('express');
const router = express.Router();

const boardList = require('../controllers/boardListController');
  
    // boardList Routes
    router.get('/', boardList.list_all_boards)

  
  
    /*app.route('/boards/:boardId')
      .get(boardList.read_a_board)
      .put(boardList.update_a_board)
      .delete(board.delete_a_board);*/

  
  module.exports = router;