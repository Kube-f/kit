import restify from 'restify';

export default function loadDefaultMiddlewares(kube, server) {
    const defualtMiddlewares = kube.namespace('defaultmiddlewares');

    server.use(restify.plugins.bodyParser());
}