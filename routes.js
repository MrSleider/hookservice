'use strict'

var express     = require('express');
var controller  = require('./controllers/index.js');

var router      = express.Router();

router.get('/',             controller.general.root_request);     // Return information about the microservice.

router.get('*', controller.general.not_found);              // Not found image

module.exports = router;
