const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  rollno: String,
  email: String,
  accessToken: String,
  refreshToken: String
});

module.exports.User = mongoose.model('User', userSchema);