import exampleModel from './ExampleModel';

export default function modelBootstrapper(kube) {
    kube.mountModule(exampleModel);
}