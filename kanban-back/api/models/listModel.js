const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Board'
  }
});

module.exports = mongoose.model('List', listSchema)