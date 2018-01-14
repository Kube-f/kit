export default function otherService(kube) {
    const exampleNamespace = kube.namespace('exampleServiceNamespace');

    exampleNamespace.exampleFunction('some call on another namespace');
}