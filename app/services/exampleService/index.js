export default function exampleService(kube) {
    const exampleServiceNamespace = kube.namespace('exampleServiceNamespace');
    const otherNamespace = kube.namespace('otherServiceNamespace');
    exampleServiceNamespace.def(function exampleFunction(a) {
        console.log(a);
    })

}
