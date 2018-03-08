import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

Promise.promisifyAll(jwt, { suffix: 'Promise' })

const loginRoute = 'login';

export default function JWTMiddlewares(kube, server) {
    const jwtMiddleware = kube.namespace('jwt');

    jwtMiddleware.def(function verifyJWTToken(req, res, next) {
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
            });
    });
}