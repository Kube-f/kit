const Kube = require('kube-f');
const Promise = require('bluebird');
const restify = require('restify');
const bunyan = require('bunyan');

const fs = Promise.promisifyAll(require('fs'), {suffix: 'Promise'});
const singletonKubeInstance = new Kube();


export default function appInit() {

    //load restify
    const server = restify.createServer();

    //setup bunyan logger
    //mounting it like this until I refactor mounting in kube-f itself
    singletonKubeInstance['logger'] = bunyan.createLogger({name: process.env.APP_NAME});

    //load services
    fs.readdirPromise('./app')
        .filter(nonDirectories)
        .map(dir => mountBaseDirectory(dir, server))
        .then(server.listen(process.env.PORT, function handleListenSuccess () {
            singletonKubeInstance.logger.info(`Listening on port ${process.env.PORT}`);
        }))

}

function mountBaseDirectory(directoryName, server) {
    return fs.readdirPromise(`./app/${directoryName}`)
        .filter(nonDirectories)
        .map(function handleBaseDirectoryItem(directoryItem) {
            singletonKubeInstance.logger.info(`mounting ${directoryItem}`);
            const mountableDirectoryItem = require(`./${directoryName}/${directoryItem}`).default;
            try {
                singletonKubeInstance.mountModule(mountableDirectoryItem, server);
                return
            } catch(error) {
                throw new Error('Illigal namespace function call outside of def scope')
            }
        });
}

const nonDirectories = file => !file.includes('.')
