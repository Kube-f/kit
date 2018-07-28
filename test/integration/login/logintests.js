'use strict';
require('../integrationTest.js')

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Promise'})
const request = require('request-promise');

describe('login tests \n', function () {

  const baseRequestPath = './test/integration/login/requests'

  it('should be able to login with valid credentials', function (done) {
    const url = `http://localhost:${process.env.PORT}/v1/login`
    const doRequest = async (options) => { 
      try{
        await request(options)
        done()
      } catch(error) {
        throw new Error(error)
      }
    }

    fs.readFilePromise(`${baseRequestPath}/validloginrequest.json`)
      .then(JSON.parse)
      .then(function handleParsedJson(json) {
        json.uri = url
        doRequest(json)
      })
  });

  it('should not be able to login with invalid credentials', function (done) {
    const url = `http://localhost:${process.env.PORT}/v1/login`
    const doRequest = async (options) => { 
      try{
        await request(options)
        throw new Error("able to login with invalid credentials")
      } catch(error) {
        done()
      }
    }

    fs.readFilePromise(`${baseRequestPath}/invalidloginrequest.json`)
      .then(JSON.parse)
      .then(function handleParsedJson(json) {
        json.uri = url
        doRequest(json)
      })
  });

});
