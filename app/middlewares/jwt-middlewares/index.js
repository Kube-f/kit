import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

const loginRoute = 'login';

export default function JWTMiddlewares(kube, server) {
    server.use(function jwtMiddleware(req, res, next) {
        //check if this is sent to the login route
        if(isLoginRoute(req)) {
            kube.logger.trace('request is login');
            next();
        } else {
            kube.logger.trace('request is not login')
        }
    })
}

function isLoginRoute(req) {
    const urlParams = req.url.split('/');
    return urlParams[urlParams.length-1].includes(loginRoute);
}