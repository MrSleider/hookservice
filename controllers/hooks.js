var mongoose = require('mongoose');
var Webhook = require('../models/webhook.model.js');

trigger_webhook = (req, res) => {

  if (!req.hook) {
    return res.status(400).send({ message:'Something is wrong with the hook' });
  }

  const hook = req.hook;

  console.log(hook.queries.map((query) => {
    return createSchema(query.collection);
  }))

  // The magic line
  Promise.all(hook.queries.map((query) => {
    return createSchema(query.colletion).find({});
  })).then( ([]) => {
    console.log('The end')
  });

  return res.status(200).send({ message: 'The webhook has been found!' });
}


validate_hook = (req, res, next) => {
  // This method checks the request in order to verify that all the needed data for triggering the hook is provided. Also
  // this performs some security checks in order to avoid security bypassing. Also the method checks if the hook
  // exists, in case that it does exist the method stores the hook inside the request.
  const id = req.params.id;

  if (id) {
      Webhook.findById(id, (err, webhook) => {
        if (err) {
          req.hook_error = 'There was an error while looking for the hook';
          next();
        }

        if (!webhook) {
          req.hook_error = 'The webhook does not exist';
          next();
        }

        req.hook = webhook;
        next();
      })
  } else {
    next();
  }
}

configure_connector = (req, res, next) => {
  // This method configures the connector and creates a new DB connection if needed.

}


function createSchema(collection) {
  // This method returns an empty schema in order to use it for searching collections
  let Schema = mongoose.Schema;
  return mongoose.model(collection, new Schema());
}

function processQuery() {}

module.exports = {
  trigger_webhook,
  validate_hook,
  configure_connector
}
