'use strict'

const AWS = require('aws-sdk');
const rp = require('minimal-request-promise');
const docClient = new AWS.DynamoDB.DocumentClient();

function deleteOrder(orderId) {
  return docClient.get({
    TableName: 'pizza-orders',
    Key: {
      orderId: orderId
    }
  }).promise()
    .then((result) => {
      if (result?.Item?.status === 'pending') {
        return rp.post('https://httpstat.us/200', {
          headers: {
            Authorization: 'aunt-marias-pizzeria-1234567890',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            orderId: result?.Item?.orderId,
          })
        }).then(() => {
          return docClient.delete({
            TableName: 'pizza-orders',
            Key: {
              orderId: orderId
            }
          }).promise()
        })
      } else {
        throw new Error('The pizza order cannot be deleted because is already delivered');
      }
    })
}

/*
function deleteOrder(orderId) {
  return docClient.delete({
    TableName: 'pizza-orders',
    Key: {
      orderId: orderId
    }
  }).promise()
    .then((result) => {
      console.log('Order is deleted!', result)
      return result
    })
    .catch((deleteError) => {
      console.log(`Oops, order is not deleted :(`, deleteError)
      throw deleteError
    })
}
*/

module.exports = deleteOrder
