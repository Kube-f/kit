export default function otherServiceActions(kube) {
    const otherServiceNamespace = kube.namespace('exampleService');

    otherServiceNamespace.def(function exampleFunction(argument) {
        kube.logger.trace({argument});
        return argument;
    })
}