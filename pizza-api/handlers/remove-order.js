'use strict'

const pizzas = require('../data/pizzas.json')

function removeOrder({pizzaId}) {
  if (!pizzaId) {
    throw new Error('To remove the pizza order please provide pizza type');

    return {};
  }

  const pizza = pizzas.find((pizza) => {
    return pizza.id == pizzaId;
  });

  return pizza;
}

module.exports = removeOrder;
