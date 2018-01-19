export default function exampleService(kube) {
    const exampleServiceNamespace = kube.namespace('exampleServiceNamespace');
    const otherNamespace = kube.namespace('otherServiceNamespace');
    exampleServiceNamespace.def(function exampleFunction(a) {
        if(process.env.SOME_ENV_VAR == 'some_env_value') {
            console.log(a);
        }
    })

}
