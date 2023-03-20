const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const GallerySchema = new Schema({
  alt: String,
  link: String,
  order: Number,
});