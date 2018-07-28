import actions from './actions';

export default function loginService(kube, server) {
    const login = kube.namespace('login');
    const schemans = kube.namespace("schemamiddleware")

    kube.mountModule(actions);

    server.post('/v1/login', function handleLoginRequest(req, res) {
        return schemans.validateSchema('login/schema/loginschema', req, res)
            .then(() => login.handleLogin(req.body.username, req.body.password))
            .then(function handleLoginResult(result) {
                if(!res.finished) {
                    kube.logger.info('Successfully logged in')
                    res.send(200, result);   
                }
            })
            .catch(function handleLoginError(error) {
                kube.logger.error({ error }, 'Error logging in');
                res.send(error.statusCode, error);                
            })
    })
}