import actions from './actions';

export default function otherService(kube, server) {
    const otherServiceNamespace = kube.namespace('exampleService');

    kube.mountModule(actions);
    
    server.get('/v1/exampleService', function handleExampleRequest(req, res) {
        return schemans.validateSchema('exampleService/schema/exampleschema', req, res)
            .then(otherServiceNamespace.exampleFunction(req.body))
            .then(function handleExampleResult(result) {
                if(!res.finished) {
                    kube.logger.info('Successfully did example function')
                    res.send(200, result);   
                }
            })
            .catch(function handleLoginError(error) {
                kube.logger.error({ error }, 'Error doing example function');
                res.send(error.statusCode, error);                
            })
    })

}