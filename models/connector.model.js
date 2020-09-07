'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const model = new Schema({
    alias: {
      type: String,
      required: true
    },
    description: String,
    endpoint: {
      type: String,
      required: true
    },
    port: {
      type: Number,
      required: true,
      min: 3000,
      max: 60000
    },
    db: {
      type: String,
      required: true
    },
    db_user: {
      type: String,
      required: true,
      select: false
    },
    db_password: {
      type: String,
      required: true,
      select: false
    }
});


module.exports = mongoose.model('Connector', model);
