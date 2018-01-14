const Kube = require('kube-f');
const Promise = require('bluebird');

const fs = Promise.promisifyAll(require('fs'), {suffix: 'Promise'});
const singletonKubeInstance = new Kube();


export default function appInit() {

    //load services
    fs.readdirPromise('./app')
        .filter(nonDirectories)
        .map(mountBaseDirectory)
}

function mountBaseDirectory(directoryName) {
    const directoryItems = fs.readdirPromise(`./app/${directoryName}`)
        .filter(nonDirectories)
        .map(function handleBaseDirectoryItem(directoryItem) {
            const mountableDirectoryItem = require(`./${directoryName}/${directoryItem}`).default;
            singletonKubeInstance.mountModule(mountableDirectoryItem);
        })
}

const nonDirectories = file => !file.includes('.')

/*
    Kube instance.
    
    load modules onto kube instance

        map module files and mount accordingly
*/