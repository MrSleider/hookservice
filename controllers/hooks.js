var mongoose = require('mongoose');
var Webhook = require('../models/webhook.model.js');

trigger_webhook = async (req, res) => {

  if (!req.hook) {
    return res.status(400).send({ message:'Something is wrong with the hook' });
  }

  const hook  = req.hook;
  var   data  = [];

  for ( let query of hook.queries) {
    var model = createSchema(query.collection);
    data.push(await model.find(getFilterParams(query.filters) || {}));
  }

  return res.status(200).send({ message: 'The data has been found!', data: data });
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
  return mongoose.model(collection, new Schema({}, {strict: false}));
}

function getFilterParams( filters ) {
  // This function takes an array of objects. Those objects have a param and a value.
  // The query will be filtered using this param-key values
  filters = filters || [];

  if ( filters.length == 0 ) return {}

  var final_filter = {};

  for ( let filter of filters) {
    // Should have two params : "param" and "value"
    final_filter[filter.param] = filter.value;
  }

  return final_filter;
}

module.exports = {
  trigger_webhook,
  validate_hook,
  configure_connector
}
