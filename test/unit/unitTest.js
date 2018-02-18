'use strict';
const Kube = require('kube-f');
const kubeInstance = new Kube();
const exampleNamespace = kubeInstance.namespace('testNamespace');


describe('unit tests', function () {

  it('should be able to do a function call', function (done) {
    exampleNamespace.def(function thing(arg) {
      return arg;
    });
    exampleNamespace.thing('thing')
      .finally(done);
  });
});