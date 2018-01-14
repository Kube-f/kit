export default function otherService(kube) {
    const exampleNamespace = kube.namespace('exampleServiceNamespace');
    const otherServiceNamespace = kube.namespace('otherServiceNamespace');

    
    exampleNamespace.exampleFunction('some call on another namespace');

    otherServiceNamespace.def(function otherServiceFunction(a) {
        console.log(`other service namespace ${a}`);
    })
}