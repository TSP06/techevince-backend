const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  name: String,
  rollno: String,
  email: String,
  accessToken: String,
  refreshToken: String,
  businessVote: ObjectId,
  softwareVote: ObjectId,
  hardwareVote: ObjectId,
});

module.exports.User = mongoose.model('User', userSchema);