export default function errorLib(kube) {
    const error = kube.namespace("errors")
    kube["errors"] = {}

    error.defSync(function defineError(name, statusCode, message) {
        kube.errors[name] = {
            statusCode,
            message
        }
    })

    //login
    error.defineError("invalidCredentialsError", 403, "invalid login credentials provided")
    
    //user
    error.defineError("userCreateError", 500, "could not create user")

}