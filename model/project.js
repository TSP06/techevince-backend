const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProjectSchema = new Schema({
  name: String,
  description: String,
  booth: String,
  category: String,
  teamMembers: [String],
  links: [String],
  images: [String],
  club: ObjectId
});

module.exports = mongoose.model('Project', ProjectSchema);
