import jwt, { verify } from 'jsonwebtoken';
import Promise from 'bluebird';

const loginRoute = 'login';

export default function JWTMiddlewares(kube, server) {
    Promise.promisifyAll(jwt, { suffix: 'Promise' })
    server.use(function jwtMiddleware(req, res, next) {
        //check if this is sent to the login route
        if(isLoginRoute(req)) {
            kube.logger.trace('handling non JWT route');
            next();
        } else {
            kube.logger.trace('handling jwt protected route')
            verifyJWTToken(req, res);
        }
    })
}

function isLoginRoute(req) {
    const urlParams = req.url.split('/');
    return urlParams[urlParams.length-1].includes(loginRoute);
}

function verifyJWT(req, res) {
    if(!req.header('authorization')) {
        res.send(403, 'No JWT token provided')
    }

    const token = req.header('authorization');
    const secret = process.env.JWT_SECRET;
    return verifyPromise(token, secret)
        .then(function handleVerifyResult(data, err) {
            return err ? false : true;
        })
        .catch(function handleJWTError(err) {
            res.send(403, 'Error verifying jwt token');
        })
}