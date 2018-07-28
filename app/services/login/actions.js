import jwt from 'jsonwebtoken';

export default function loginServiceActions(kube) {
    const login = kube.namespace('login');

    login.def(function handleLogin(username, password) {
        /*
            write your own login verification here
            this is simply a place holder

            DO NOT USE THIS CODE!
            MAKE YOUR OWN VERIFICATION !
        
            we check for password.length so i can create an example
            test to see if we are rejected a token when trying to login
            with invalid credentials
            */
        if(username && password && password.length > 1) {
            return { token: jwt.sign({ user: username }, process.env.JWT_SECRET, {
                expiresIn: '2h'
            })}
        } else {
            throw kube.errors.invalidCredentialsError
        }
    })
}