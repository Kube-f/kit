'use strict';

const request = require('request-promise');

  before('start the app', function handleBefore(done) {
    require('babel-register');
    require('dotenv').config();
    const bootApp = async () => {
      await require('../../app/index.js')
      .default()
      done()
    }
    bootApp()
  })
