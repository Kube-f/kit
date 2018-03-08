import actions from './actions';

export default function loginService(kube, server) {
    const login = kube.namespace('login');

    kube.mountModule(actions);

    server.post('/v1/login', function handleLoginRequest({ body }, res) {
            const { username, password } = body;
            return login.handleLogin(username, password)
                .then(function handleLoginResult(result) {
                    kube.logger.info('Successfully logged in user')
                    res.send(200, result);
                })
                .catch(function handleLoginError(error) {
                    const errorMessage = 'Error while loggin in';
                    kube.logger.error({ error }, errorMessage);
                    res.send(500, errorMessage);
                })
    })
}