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
    ref: 'Card'}]
});

module.exports = mongoose.model('List', ListSchema)