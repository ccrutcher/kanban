const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Board'
    },
    listId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'List'
    }
  });
  
module.exports = mongoose.model('Card', cardSchema)