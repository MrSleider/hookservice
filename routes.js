'use strict'

var express     = require('express');
var controller  = require('./controllers/index.js');

var router      = express.Router();

router.get('/',             controller.general.root_request);     // Return information about the microservice.


// connectors

// Webhooks
router.get('/webhook/:id',  controller.webhooks.get_webhook);
router.get('/webhooks',     controller.webhooks.get_webhooks);
router.post('/webhook',     controller.webhooks.create_webhook);
router.delete('/webhook/:id', controller.webhooks.remove_webhook);

// Hooks
router.get('*', controller.general.not_found);              // Not found image

module.exports = router;
