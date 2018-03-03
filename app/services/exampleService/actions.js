export default function otherServiceActions(kube) {
    const otherServiceNamespace = kube.namespace('exampleService');
    const mongo = kube.namespace('mongo');


    otherServiceNamespace.def(function exampleFunction(argument) {
        kube.logger.trace({argument});
        return mongo.setupConnection()
            .then(function handleMongoConnection(client) {
                client.close();
                return argument;
            })
    })

}