var express = require('express');
var router = express.Router();

const boardController = require('../controllers/boardController');

/* GET home page. */
router.get('/createBoard', boardController.create_a_board);

module.exports = router;