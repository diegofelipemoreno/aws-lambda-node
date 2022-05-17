'use strict'

const Api = require('claudia-api-builder');
const getPizzas = require('./handlers/get-pizzas.js');
const getOrders = require('./handlers/get-orders.js');
const createOrder = require('./handlers/create-order.js');
const updateOrder = require('./handlers/update-order.js');
const removeOrder = require('./handlers/remove-order.js');
const updateDeliveryStatus = require('./handlers/update-delivery-status.js');
const CONSTANTS = require('./constants.js');

const api = new Api();

//Index
api.get(CONSTANTS.ROUTES.index, () => "Welcome to Pizza API");

//Get Pizzas
api.get(CONSTANTS.ROUTES.pizzas, () => getPizzas());

//Get Pizzas Orders
api.get(CONSTANTS.ROUTES.orders, () => getOrders());

//Get Pizzas by ID
api.get(CONSTANTS.ROUTES.orderById, (request) => {
    return getOrders(request.pathParams.id)
}, {
  error: 404
});

// Post pizza order.
api.post(CONSTANTS.ROUTES.orders, (request) => {
    return createOrder(request.body)
  }, {
    success: 201,
    error: 400
  });
  
// Update pizza order.
api.put(CONSTANTS.ROUTES.orderById, (request) => {
    return updateOrder(request.pathParams.id, request.body)
   }, {
    error: 400
   });

// Remove pizza order.
api.delete(CONSTANTS.ROUTES.orderById, (request) => {
    return removeOrder(request.pathParams.id)
   }, {
    error: 400
   });

// Handler for the webhook.
api.post(CONSTANTS.ROUTES.delivery, (request) => {
  return updateDeliveryStatus(request.body)
 }, {
  success: 200,
  error: 400
 });

module.exports = api;