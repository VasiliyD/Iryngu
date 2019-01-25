var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PhotoSchema = new Schema({
  link: String,
  width: Number,
  height: Number,
  isOriginal: Boolean
})

module.exports = mongoose.model('Photo', PhotoSchema)