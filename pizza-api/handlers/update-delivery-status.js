'use strict'

const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const docClient = new AWS.DynamoDB.DocumentClient();

function updateDeliveryStatus(request) {
  if (!request.orderId || !request.status)
    throw new Error('Status and order ID are required')

  return docClient.update({
    TableName: 'pizza-orders',
    Key: {
      orderId: request.orderId
    },
    UpdateExpression: 'set orderStatus = :s',
    ExpressionAttributeValues: {
      ':s': request.status
    }
  }).promise()
    .then(() => {
      setTimeout(() => {
        return docClient.update({
          TableName: 'pizza-orders',
          Key: {
            orderId: request.orderId
          },
          UpdateExpression: 'set orderStatus = :s',
          ExpressionAttributeValues: {
            ':s': "delivered"
          }
        }).promise()
        .then((result) => {
          console.log('Order is updated as delivered!', result);
        });
      }, 2000);
    })
}

module.exports = updateDeliveryStatus;
