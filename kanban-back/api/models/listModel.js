const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  cards: [{    
    type: Schema.Types.ObjectId,
    ref: 'Card'}],
  boardId: {
    type: Number,
    min : 100000000,
    max : 999999999,
    required: true
  }
});

module.exports = mongoose.model('List', ListSchema)