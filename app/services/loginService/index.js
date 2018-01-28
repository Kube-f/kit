export default function loginService(kube, server) {
    const loginService = kube.namespace('loginNamespace');

    server.post('/v1/login', function handleLoginRoute(req, res) {
        res.send(200, {});
    })
}