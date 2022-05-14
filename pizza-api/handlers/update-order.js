'use strict'

const pizzas = require('../data/pizzas.json')

function updateOrder({pizzaId, address}) {
  if (!pizzaId || !address) {
    throw new Error('To order pizza please provide pizza type and address to update the order');

    return {};
  }

  const pizza = pizzas.find((pizza) => {
    return pizza.id == pizzaId;
  });

  return pizza;
}

module.exports = updateOrder;
