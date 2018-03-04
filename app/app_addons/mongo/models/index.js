import exampleModel from './exampleModel';

export default function modelBootstrapper(kube) {
    kube.mountModule(exampleModel);
}