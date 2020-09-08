'use strict'

var mongoose    = require('mongoose');
var Schema = mongoose.Schema;

const Model = new Schema({
  alias: {
    type: String,
    required: [true, 'The webhook alias is required']
  },
  description: String,
  action: {
    type: String,
    enum: ['GET', 'SAVE', 'UPDATE', 'REMOVE']
  },
  connector: {
    type: Schema.ObjectId,
    ref: 'Connector'
  },
  queries: []
});

module.exports = mongoose.model('Webhook', Model);
