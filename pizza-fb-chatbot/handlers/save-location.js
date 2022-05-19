'use strict'

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

function saveLocation(userId, coordinates) {
  return docClient.scan({
    TableName: 'pizza-orders',
    Limit: 1,
    FilterExpression: `#user = :u and orderStatus = :s`,
    ExpressionAttributeNames: {
       '#user': 'user'
    },
    ExpressionAttributeValues: {
      ':u': userId,
      ':s': 'in-progress'
    }
  }).promise()
    .then((result) => result.Items[0])
    .then((order) => {
      return docClient.update({
        TableName: 'pizza-orders',
        Key: {
          orderId: order.orderId
        },
        UpdateExpression: 'set orderStatus = :s, coords=:c, deliveryId=:d',
        ExpressionAttributeValues: {
          ':s': 'pending',
          ':c': coordinates,
          ':d': order.deliveryId
        },
        ReturnValues: 'ALL_NEW'
      }).promise()
    })
}

module.exports = saveLocation
