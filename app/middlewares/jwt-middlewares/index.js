import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

Promise.promisifyAll(jwt, { suffix: 'Promise' })

const loginRoute = 'login';

export default function JWTMiddlewares(kube, server) {
    const jwtMiddleware = kube.namespace('jwt');

    jwtMiddleware.def(function verifyJWTToken(req, res, next) {
        const token = req.header('authorization').split(' ')[1];
        if(!token || token == '') {
            const errorMessage = 'No JWT token provided';
            kube.logger.error(errorMessage);
            res.send(403, errorMessage);
            return;
        }
    
        const secret = process.env.JWT_SECRET;
    
        return jwt.verifyPromise(token, secret)
            .then(function handleVerifyResult(data, err) {
                next()
            })
    });
}