'use strict'

const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

function generatePresignedUrl() {
  const params = {
    Bucket: 'diegos-pizzeria',
    Key: uuidv4(),
    ACL: 'public-read',
    Expires: 120
  }

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err)
        return reject(err)
        
      resolve({
        url: url
      })
    })
  })
}

module.exports = generatePresignedUrl
