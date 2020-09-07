'use strict'

var mongoose = require('mongoose');
var app      = require('./app.js');

const PORT  = process.env.PORT || 4894;
const mongoEndpoint = 'mongodb://localhost:27017/hooks';


mongoose.connect(mongoEndpoint, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`[*] Moongose connection stablished on: ${mongoEndpoint}`);
  app.listen( PORT, () => {
      console.log(`[*] HTTP server up and running on: http://localhost:${PORT}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.log('[!] Could not stablish mongoose connection...')
});

mongoose.connection.on('disconnected', () => {
  console.log('[*] The mongoose connection has been successfully disconnected');
});

process.on('SIGNIT', () => {
  // There was an appplication error. We should close the mongo connection before closing the application
  console.log('[!] Application error, closing mongodb connection...');
  mongoose.connection.close(() => {
    console.log(`[*] MongoDB connection closed.`)
    process.exit(0);
  })
})
