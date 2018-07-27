import browserModel from './browserModel';

export default function modelBootstrapper(kube) {
    kube.mountModule(browserModel);
}