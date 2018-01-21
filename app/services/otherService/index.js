import actions from './actions';

export default function otherService(kube, server) {
    const otherServiceNamespace = kube.namespace('otherServiceNamespace');

    kube.mountModule(actions);
    
    server.get('/v1/exampleEndpoint', function handleExampleRequest(req, res) {
        console.log('example endpoint');
        otherServiceNamespace.exampleFunction('someString')
            .then(function handleExampleFunctionResult(result) {
                console.log('result of example endpoint: ', result);
                return res.send(result);
            })
    })

}