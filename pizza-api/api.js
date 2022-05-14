'use strict'

const Api = require('claudia-api-builder');
const getPizzas = require('./handlers/get-pizzas.js');
const getPizzasOrders = require('./handlers/get-pizzas-orders.js');
const createOrder = require('./handlers/create-order.js');
const updateOrder = require('./handlers/update-order.js');

const api = new Api()
const ROUTES = {
    index: "/",
    pizzas: "/pizzas",
    pizzaOrders: "/pizzas-orders",
    pizzaById: "/pizzas/{id}",
    createPizzaOrder: "/orders",
    updatePizzaOrder: "/update/{id}",
}

//Index
api.get(ROUTES.index, () => "Welcome to Pizza API");

//Get Pizzas
api.get(ROUTES.pizzas, () => getPizzas());

//Get Pizzas Orders
api.get(ROUTES.pizzaOrders, () => getPizzasOrders());

//Get Pizzas by ID
api.get(ROUTES.pizzaById, (request) => {
    return getPizzas(request.pathParams.id)
}, {
  error: 404
});

// Post pizza order.
api.post('/orders', (request) => {
    return createOrder(request.body)
  }, {
    success: 201,
    error: 400
  });
  
/*
// Update pizza order.
api.put(ROUTES.createPizzaOrder, (request) => {
    return updateOrder(request.body)
   }, {
    error: 400
   });

// Remove pizza order.
api.delete(ROUTES.createPizzaOrder, (request) => {
    return removeOrder(request.pathParams.id)
   }, {
    error: 400
   });
*/

module.exports = api;