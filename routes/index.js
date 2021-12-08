const express = require('express');
const products_routes = require('./products.router');
const users_routes = require('./users.router');
const categories_routes = require('./categories.router');

function routerApi(app) {
  //Main router para manejo versiones
  const MainRouter = express.Router();
  app.use('/api/v1', MainRouter);

  MainRouter.use('/products', products_routes);
  MainRouter.use('/users', users_routes);
  MainRouter.use('/categories', categories_routes);
}

module.exports = routerApi;
