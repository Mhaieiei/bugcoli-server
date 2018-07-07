const handlerError = require('./handlers');
const mainRoutes = require('./routes/MainRoutes');


const routeConfig = (app) => {

  app.use(`${process.env.URL_PREFIX}`, mainRoutes);

  app.use(handlerError);

  app.use((req, res) => {
    res.status(404).json({
      error: 404,
      description: 'Not found',
      url: req.originalUrl,
    });
  });
};

module.exports = routeConfig;