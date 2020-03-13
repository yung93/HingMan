var expressJwt = require('express-jwt/lib');
var path = require('path');

import addressRoute from './api/address/router';
import residentRoute from './api/resident/router';
import eventRoute from './api/event/router';
import registerRouter from './api/register/router';

module.exports = function (app) {

    // middleware to use for all requests
    app.use(function (req, res, next) {
        // do logging
        console.log('Entered first middleware.');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, OPTIONS, X-Requested-With, Content-Type, Accept, timezone, Authorization, merchantId",);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE",);
        next(); // make sure we go to the next routes and don't stop here
    });

    // use JWT auth to secure the api
    // app.use('/api', exp/ressJwt({secret: secret.secret}).unless({path: ['/api/user/login', '/api/user/signup']}));

    // server routes ===========================================================
    // handle things like api calls

    app.use('/api/address', addressRoute);
    app.use('/api/resident', residentRoute);
    app.use('/api/event', eventRoute);
    app.use('/api/register', registerRouter);

    // frontend routes =========================================================
    // route to handle all angular requests
    //
    // app.get('/test/*', function(req, res) {
    //     res.sendfile('./public/test/index.js');
    // });

};