'use strict';
const Kube = require('kube-f');
const kubeInstance = new Kube();
const exampleNamespace = kubeInstance.namespace('testNamespace');



describe('some test', function () {

  before('start the app', function handleBefore(done) {
    require('babel-register');
    require('dotenv').config();
    require('../../app/index.js').default();
    done();
  })

  it('should be able to do a function call', function (done) {
    exampleNamespace.def(function thing(arg) {
      return arg;
    });
    exampleNamespace.thing('thing')
      .finally(done);
  });
});