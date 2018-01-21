import actions from './actions';

export default function otherService(kube) {
    const otherServiceNamespace = kube.namespace('otherServiceNamespace');

    kube.mountModule(actions);
    
    otherServiceNamespace.exampleFunction('someString');
}