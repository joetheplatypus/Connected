const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  message:{
    type: String,
    required: true
  },
  userId:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Post', postSchema)