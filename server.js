/**
 * @module       Greetingsapp
 * @file         server.js
 * @description  connecting to server and rendering all routes
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
*  @since        15/02/2021  
-----------------------------------------------------------------------------------------------*/
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger/logger');
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger/swagger.json')

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "welcome to greetings app" });
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
// Require Notes routes
require('./app/routes/greetings.js')(app);

// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
    logger.info(`the server is listening on port 8000`)
});

module.exports = app;