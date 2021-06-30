const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  });

const ListSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    cards: [CardSchema]
  });

const BoardSchema = new Schema({
    id: {
    type: Number,
    min : 100000000,
    max : 999999999,
    required: true,
    unique: true
    },
    lists: {
        type: [ListSchema],
        default: [{"title": "To Do", "index": 0},{"title": "In Progress", "index": 1},{"title": "Completed", "index": 2}]
    }
});

module.exports = mongoose.model('Board', BoardSchema);