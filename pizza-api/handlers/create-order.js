'use strict'

const AWS = require('aws-sdk');
const rp = require('minimal-request-promise');
const updateDeliveryStatus = require('./update-delivery-status.js');
const uuid = require('uuid');
const CONSTANTS = require('../constants.js');

const docClient = new AWS.DynamoDB.DocumentClient();

function createOrder(request) {
  if (!request || !request.pizza || !request.address)
    throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')

  //Delivery API. Fake
  return rp.post('https://private-a1fea7-diegofelipemoreno.apiary-mock.com/delivery', {
    headers: {
      Authorization: 'aunt-marias-pizzeria-1234567890',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      pickupTime: '15.34pm',
      pickupAddress: 'Aunt Maria Pizzeria',
      deliveryAddress: request.address,
      //webhookUrl: `${CONSTANTS.URL_SITE}${CONSTANTS.ROUTES.delivery}`,
    })
  })
    .then(rawResponse => JSON.parse(rawResponse.body))
    .then((response) => {
      return docClient.put({
        TableName: 'pizza-orders',
        Item: {
          orderId: uuid(),
          pizza: request.pizza,
          address: request.address,
          status: response.status
        }
      }).promise()
    })
    .then(res => {
      console.log('Order is saved!', res)

      return res
    })
    .catch(saveError => {
      console.log(`Oops, order is not saved :(`, saveError)

      throw saveError
    }).finally((res) => {
      console.log(res);
    });
}

/*
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const uuid = require('uuid')

function createOrder(request) {
  if (!request || !request.pizza || !request.address)
    throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')

  return docClient.put({
    TableName: 'pizza-orders',
    Item: {
      orderId: uuid(),
      pizza: request.pizza,
      address: request.address,
      status: 'pending'
    }
  }).promise()
    .then((res) => {
      console.log('Order is saved!', res)
      return res
    })
    .catch((saveError) => {
      console.log(`Oops, order is not saved :(`, saveError)
      throw saveError
    })
}
*/

module.exports = createOrder;
