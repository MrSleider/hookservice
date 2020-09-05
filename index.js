'use strict'

var mongoose = require('mongoose');
var app      = require('./app.js');

const PORT  = process.env.PORT || 4894;
const mongoEndpoint = 'mongodb://localhost:27017/hooks';

mongoose.connect(mongoEndpoint, {useNewUrlParser: true }, (err) => {

    if ( err ) {
        console.log("No se ha podido conectar con mongodb", 'error');
        throw err;
    } else {
        console.log('Se ha establecido la conexión con MongoDB');
        //var server = http.createServer(app);

        app.listen( port, () => {
            console.log(`Servidor montado en http://localhost:${port}`);


        });
    }
})
