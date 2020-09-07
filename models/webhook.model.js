'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Model = new Schema({
  alias: {
    type: String,
    required: [true, 'The webhook alias is required']
  },
  description: String,
  queries: []
});

module.exports = mongoose.model('Webhook', Model);
