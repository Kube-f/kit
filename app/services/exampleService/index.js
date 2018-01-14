export default function exampleService(kube) {
    const exampleServiceNamespace = kube.namespace('exampleServiceNamespace');

    exampleServiceNamespace.def(function exampleFunction(a) {
        console.log(a);
    })
}
