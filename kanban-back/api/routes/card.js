const express = require('express');
const router = express.Router();

const cardController = require('../controllers/cardController');

    // card routes
    router.get('/', cardController.list_cards);
    router.post('/', cardController.create_a_card);
    router.put('/', cardController.update_cards);
    router.delete('/', cardController.delete_a_card);

  module.exports = router;