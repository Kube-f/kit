const Kube = require('kube-f');
const Promise = require('bluebird');
const restify = require('restify');

const fs = Promise.promisifyAll(require('fs'), {suffix: 'Promise'});
const singletonKubeInstance = new Kube();


export default function appInit() {

    //load restify
    const server = restify.createServer();

    //load services
    fs.readdirPromise('./app')
        .filter(nonDirectories)
        .map(dir => mountBaseDirectory(dir, server))
        .then(server.listen(process.env.PORT, function handleListenSuccess () {
            //TODO implement proper logger
            console.log('Server running at ' + process.env.PORT);
        }))

}

function mountBaseDirectory(directoryName, server) {
    const directoryItems = fs.readdirPromise(`./app/${directoryName}`)
        .filter(nonDirectories)
        .map(function handleBaseDirectoryItem(directoryItem) {
            const mountableDirectoryItem = require(`./${directoryName}/${directoryItem}`).default;
            try {
                singletonKubeInstance.mountModule(mountableDirectoryItem, server);
            } catch(error) {
                throw new Error('Illigal namespace function call outside of def scope')
            }
            return
        })
}

const nonDirectories = file => !file.includes('.')
