import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

Promise.promisifyAll(jwt, { suffix: 'Promise' })

const loginRoute = 'login';

export default function JWTMiddlewares(kube, server) {
    server.use(function jwtMiddleware(req, res, next) {
        //check if this is sent to the login route
        if(isLoginRoute(req)) {
            kube.logger.trace('handling non JWT route');
            next();
        } else {
            kube.logger.trace('handling jwt protected route')
            verifyJWTToken(kube, req, res, next);
        }
    })
}

function isLoginRoute(req) {
    const urlParams = req.url.split('/');
    return urlParams[urlParams.length-1].includes(loginRoute);
}

function verifyJWTToken(kube, req, res, next) {
    if(!req.header('authorization')) {
        const errorMessage = 'No JWT token provided';
        kube.logger.error(errorMessage);
        res.send(403, errorMessage);
        return;
    }

    const token = req.header('authorization').split(' ')[1];
    const secret = process.env.JWT_SECRET;

    return jwt.verifyPromise(token, secret)
        .then(function handleVerifyResult(data, err) {
            next()
        })
        .catch(function handleJWTError(err) {
            res.send(403, {err, msg: 'Error verifying jwt token'});
        })
}