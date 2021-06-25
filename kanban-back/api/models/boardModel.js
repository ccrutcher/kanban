const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    id: {
    type: Number,
    min : 100000000,
    max : 999999999,
    required: true,
    unique: true
    }
});

module.exports = mongoose.model('Board', BoardSchema);