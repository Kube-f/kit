export default function otherServiceActions(kube) {
    const otherServiceNamespace = kube.namespace('otherServiceNamespace');

    otherServiceNamespace.def(function exampleFunction(argument) {
        console.log('service actions: ',argument);
        return argument;
    })
}