'use strict'

const createOrder = require('../../handlers/create-order');
const https = require('https');
const fakeHttpRequest = require('fake-http-request');
const AWS = require('aws-sdk');
let docClientMock;


const fakeApiMockBodyRequest = {
    protocol: 'https:',
    slashes: true,
    hash: null,
    search: null,
    query: null,
    port: null,
    auth: null,
    host: 'private-a1fea7-diegofelipemoreno.apiary-mock.com',
    path: '/delivery',
    method: 'POST',
    headers: { 
      Authorization: 'aunt-marias-pizzeria-1234567890',
      'Content-type': 'application/json' },
    body: JSON.stringify({
        pickupTime:"15.34pm",
        pickupAddress:"Aunt Maria Pizzeria",
        deliveryAddress: "221b Baker Street"
    })
  };

describe('Create order handler', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

  beforeEach(() => {
    AWS.config.update({region:'us-east-1'});  
    fakeHttpRequest.install('https');

    docClientMock = jasmine.createSpyObj('docClient', {
      put: { promise: Promise.resolve.bind(Promise) },
      configure() { }
    })
    AWS.DynamoDB.DocumentClient.prototype = docClientMock
  })

  afterEach(() => fakeHttpRequest.uninstall('https'));

  it('should throw an error if request is not valid', () => {
    expect(function() { createOrder(); } ).toThrow(new Error('To order pizza please provide pizza type and address where pizza should be delivered'));
    expect(function() { createOrder({}); } ).toThrow(new Error('To order pizza please provide pizza type and address where pizza should be delivered'));
    expect(function() { createOrder(1); } ).toThrow(new Error('To order pizza please provide pizza type and address where pizza should be delivered'));
    expect(function() { createOrder({ body: {} }); } ).toThrow(new Error('To order pizza please provide pizza type and address where pizza should be delivered'));
    expect(function() { createOrder({ body: {pizza: 1} }); } ).toThrow(new Error('To order pizza please provide pizza type and address where pizza should be delivered'));
    expect(function() { createOrder({ body: {address: '221b Baker Street'} }); } ).toThrow(new Error('To order pizza please provide pizza type and address where pizza should be delivered'));
  });

  it('should send POST request to Delivery API. Fake diegofelipemoreno.apiary-mock.com/delivery', (done) => {
    createOrder({
      body: {
        pizza: 1,
        address: '221b Baker Street'
      }
    })
    
    https.request.pipe((callOptions) => {
      expect(https.request.calls.length).toBe(1);
      expect(callOptions).toEqual(jasmine.objectContaining(fakeApiMockBodyRequest));
      done();
    })
  });

  it('should call the DynamoDB DocumentClient.put if Fake diegofelipemoreno.apiary-mock.com/delivery API request was successful', (done) => {
    // To simulate a successful response from the Fake diegofelipemoreno.apiary-mock API, in order to continue with the flow that is write on the DB.
    https.request.pipe((callOptions) => https.request.calls[0].respond(
        200, 'Ok', JSON.stringify({
            address:"mi chuzo",
            orderId:"11111",
            pizza:4,
            status:"pending"
            })
        )
    )

    createOrder({
      body: { pizza: 1, address: '221b Baker Street' }
    })
      .then(() => {
        console.log(response);
        expect(docClientMock.put).toHaveBeenCalled();
        done();
      })
      .catch(done.fail)
  })
})