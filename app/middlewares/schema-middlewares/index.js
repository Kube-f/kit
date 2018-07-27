const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Promise'})
const Ajv = require('ajv')

export default function schemaMiddlewares(kube, server) {
    const schemaMiddlewareNamespace = kube.namespace("schemamiddleware")
    const baseRoute = './app/services/'

    schemaMiddlewareNamespace.def(function validateSchema(schemaPath, req, res) {
        return fs.readFilePromise(`${baseRoute}${schemaPath}.json`)
            .then(JSON.parse)
            .then(function handleParsedJson(parsedSchema) {
                const ajv = new Ajv()
                const valid = ajv.compile(parsedSchema)
                if(!valid(req.body)) {
                    res.send(403, valid.errors)
                    return
                }
                return
            })
    })

}