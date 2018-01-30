import actions from './actions';

export default function otherService(kube, server) {
    const otherServiceNamespace = kube.namespace('exampleService');

    kube.mountModule(actions);
    
    server.get('/v1/exampleService', function handleExampleRequest(req, res) {
        otherServiceNamespace.exampleFunction('some example arg')
            .then(function handleExampleFunctionResult(result) {
                kube.logger.info({result}, 'result from exampleFunction');
                return res.send(result);
            })
    })

}