import mongoose from 'mongoose'

const MovieSchema = new mongoose.Schema({
  title: {type: String, require: true, unique: true},
  desc: {type: String},
  image: {type: String},
  imageTitle: {type: String},
  imageSm: {type: String},
  trailer: {type: String},
  video: {type: String},
  year: {type: String},
  limit: {type: Number},
  genrer: {type: String},
  isSeries: { type: Boolean, default: false},

}, {
  timestamps: true
})

const MovieModel = mongoose.model('Movie', MovieSchema);
export default MovieModel