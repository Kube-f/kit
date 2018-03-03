import jwt from 'jsonwebtoken';

export default function loginServiceActions(kube) {
    const login = kube.namespace('login');

    login.def(function handleLogin(username, password) {
        /*
            write your own login verification here
            this is simply a place holder

            DO NOT USE THIS CODE!
            MAKE YOUR OWN VERIFICATION !
        */
        if(username && password) {
            return { token: jwt.sign({ user: username }, process.env.JWT_SECRET, {
                expiresIn: '2h'
            })}
        } else {
            return 'Authentication failed';
        }
    })
}