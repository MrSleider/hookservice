'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const model = new Schema({
    alias: String,
    description: String,
    endpoint: String,
    port: Number,
    db: String,
    db_user: String,
    db_password: String
});


module.exports = mongoose.model('Connector', model);
