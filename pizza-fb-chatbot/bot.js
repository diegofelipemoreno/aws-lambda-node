'use strict'

const pizzas = require('./data/pizzas.json')

const botBuilder = require('claudia-bot-builder')
const fbTemplate = botBuilder.fbTemplate

const api = botBuilder((message) => {
  const reply = new fbTemplate.Generic()

  console.log("denuevo", message);
  console.log("devuelta", message.postback);

  if (message.postback) {
    const [action, pizzaId] = message.text.split('|');

    console.log("accion", action);
    console.log("pizzaId", pizzaId);
  }

    
  pizzas.forEach(pizza => {
    reply.addBubble(pizza.name)
        .addImage(pizza.image)
        .addButton('Details', `DETAILS|${pizza.id}`)
        .addButton('Order', `ORDER|${pizza.id}`)
    })
    return [
        `Hello, here's our pizza menu:`,
        reply.get()
    ]
   }, {
        platforms: ['facebook']
   })

   module.exports = api