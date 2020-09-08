var Webhook = require('../models/webhook.model.js');


get_webhooks    = (req, res) => {
  // Returns all webhooks
  Webhook.find({}, (err, webhooks) => {
    if (err) {
      return res.status(500).send({ message: 'Could not get the webhooks'});
    }

    return res.status(200).send({ message: 'The webhooks have been fetched', data: webhooks })
  });
}

get_webhook     = (req, res) => {
  // Returns a single webhook. This webhook is identified by its ID.
  const id  = req.params.id;

  Webhook.findById( id, (err, webhook) => {
    if (err) {
      return res.status(400).send({ message: 'Could not get the webhook' });
    }

    if (!webhook) {
      // Could not found the webhook id
      return res.status(404).send({ message: `Could not find the webhook with ID: ${id}`});
    }

    return res.status(200).send({ message: 'The webhook has been found!', data: webhook });
  });
}


create_webhook  = (req, res) => {
  // Creates a new webhook and stores it into the DB
  var params  = req.body;

  var webhook = new Webhook();

  webhook.alias       = params.alias;
  webhook.description = params.description || 'There is no description for this webhok';
  webhook.queries     = getTestingQueries();

  try {
    webhook.save((err, savedWebhook) => {
      if (err) {
        if (err.errors['alias']) return res.status(400).send({ message: 'Missing alias'});
        return res.status(500).send({ message: 'Could not save the webhook'});
        console.log('[!] Error saving a webhook: ', err);
      }

      res.status(200).send({ message: 'The webhook has been saved successfully!', webhook: savedWebhook });
    });
  } catch ( error ) {
    return res.status(400).send({ message: 'There are missing params!' })
  }
}

put_webhook     = (req, res) => {}

remove_webhook  = (req, res) => {
  var id = req.params.id;

  Webhook.findOneAndRemove({ _id: id }, (err, webhook) => {

    if (err) return res.status(500).send({ message: 'Could not remove the webhook' });
    if (!webhook) {
      // No webhook was removed because the webhook was not found
      return res.status(404).send({ message: `Could not find any webhook with id: ${id}`})
    }

    return res.status(200).send({ message: 'The webhook has been successfully removed!' });
  });
}

function getTestingQueries() {
  // Just for testing
  return [
    { collection: 'cars' }
  ];
}

module.exports = { get_webhooks, get_webhook, create_webhook, put_webhook, remove_webhook }
