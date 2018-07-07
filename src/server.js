const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const expressConfig = require('./express');
const routesConfig = require('./app/routes');
//import mongoose from 'mongoose';

dotenv.config();
const app = express();

// app.get('/', function (req, res) {
//   res.send('hello world')
// })
 
expressConfig(app);
routesConfig(app);



//Database config
const host = process.env.DB_HOST;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const dbport = process.env.DB_PORT;
const databaseconnect = `mongodb://${user}:${password}@${host}:${dbport}/${database}`;


mongoose.connect(databaseconnect,{ useNewUrlParser: true })
  .then(() => console.info('Connected to mongodb database'))
  .catch(err => console.error({ databaseconnect, err }));

app.listen(8080,() => {
  console.log('app listen on port 8080');
})


module.exports = app;