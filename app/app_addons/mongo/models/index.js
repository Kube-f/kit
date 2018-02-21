import ExampleModel from './ExampleModel';

export default function modelBootstrapper(kube) {
    kube.mountModule(ExampleModel);
}