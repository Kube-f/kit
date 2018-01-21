import actions from './actions';

export default function otherService(kube, server) {
    const otherServiceNamespace = kube.namespace('otherServiceNamespace');

    kube.mountModule(actions);
    
    server.get('/v1/exampleEndpoint', function handleExampleRequest(req, res) {
        otherServiceNamespace.exampleFunction('someString')
            .then(function handleExampleFunctionResult(result) {
                kube.logger.info({result}, 'resilt from exampleFunction');
                return res.send(result);
            })
    })

}