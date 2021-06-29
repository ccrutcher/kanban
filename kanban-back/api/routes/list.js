const express = require('express');
const router = express.Router();

const listController = require('../controllers/listController');
  

    router.get('/', listController.list_all_lists);
    //router.post('/lists', listController.create_a_list);
  

  
  module.exports = router;