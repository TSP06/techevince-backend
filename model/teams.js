const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: String,
  designation: String,
  image: String,
  orderBy: Number,
});

module.exports = mongoose.model('Team', TeamSchema);