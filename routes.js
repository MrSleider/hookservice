'use strict'

var express     = require('express');
var controller  = require('./controllers/index.js');

var router      = express.Router();

router.get('/',             controller.general.root_request);     // Return information about the microservice.

// Routes for the Connector CRUD.
router.get('/connectors',     controller.connectors.get_connectors);
router.get('/connector/:id',  controller.connectors.get_connector);
router.post('/connector',     controller.connectors.create_connector);
router.delete('/connector',   controller.connectors.remove_connector);

// Webhooks CRUD. Adding, listing, removing and updating webhooks without triggering them
router.get('/webhook/:id',    controller.webhooks.get_webhook);
router.get('/webhooks',       controller.webhooks.get_webhooks);
router.post('/webhook',       controller.webhooks.create_webhook);
router.delete('/webhook/:id', controller.webhooks.remove_webhook);

// This routes are used to trigger webhooks
router.get('/hook/:id',   controller.hooks.validate_hook, controller.hooks.trigger_webhook);
router.post('/hook/:id',  controller.hooks.validate_hook, controller.hooks.trigger_webhook);
router.post('/hook',      controller.hooks.validate_hook, controller.hooks.trigger_webhook);


// Other routes
router.get('*', controller.general.not_found);              // Not found image

module.exports = router;
