const express = require('express');
const router = express.Router();

const listController = require('../controllers/listController');

    // list routes
    router.get('/', listController.list_board_lists);
    router.post('/', listController.create_a_list);
    router.put('/', listController.update_lists);
    router.delete('/', listController.delete_a_list);

  module.exports = router;