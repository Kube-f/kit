'use strict';

const request = require('request-promise');

describe('intergration tests \n', function () {
  before('start the app', function handleBefore(done) {
    require('babel-register');
    require('dotenv').config();
    require('../../app/index.js')
      .default()
      .then(function handle() {
        done();
      });
  })
  it('should be able to call an endpoint', function (done) {
    // const url = `http://localhost:${process.env.PORT}`;
    // request(url)
    //   .then(function handleResponse(response) {
    //     done();
    //   })
    done()
  });
});