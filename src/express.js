
/**
 * Module dependencies.
 */
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const winston = require('winston');
const helmet = require('helmet');

const env = process.env.NODE_ENV || 'development';


/**
 * Expose
 */

const expressConfig = (app) => {

  app.use(helmet());
  app.use(compression());

  // Use winston on production
  let log = 'dev';
  /* istanbul ignore next */
  if (env !== 'development') {
    log = {
      stream: {
        write: message => winston.info(message),
      },
    };
  }

  // Don't log during tests
  // Logging middleware
  /* istanbul ignore next */
  if (env !== 'test') {
    app.use(morgan(log));
  }

  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

  // setup the logger
  app.use(morgan('combined', { stream: accessLogStream }));

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

};

module.exports = expressConfig;
