import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

export default function JWTMiddlewares(kube, server) {
    kube.logger.info('init jwt middlewares');
    server.use(function jwtMiddleware(req, res, next) {
        //check if this is sent to the login route
        if(!req.header('authorization')) {
            kube.logger.trace({req}, 'request');
            next();
        }
    })
}

function isLoginRoute(req) {
    
}