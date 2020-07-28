const mongoose = require('mongoose');

const ResourcesSchema = mongoose.Schema({ 
adminId: {
    type: String,
  //   add required
  },
  class: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    // required: true,
  },
});

module.exports = Resources = mongoose.model('Resource',ResourcesSchema)