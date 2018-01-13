const Kube = require('kube-f');
const Promise = require('bluebird');

export default function appInit() {
    const singletonKubeInstance = new Kube();
    const fs = Promise.promisifyAll(require('fs'), {suffix: 'Promise'});
    //load services
    singletonKubeInstance = fs.readdirPromise('./app')
        .filter(file => !file.includes('.'))
        .map(function initDir(dirName) {
            
        })
}

function initDir(dirName) {
    const dirList = fs.readdirPromise(`./app/${dirName}`)
        .map(loadModule)
}

/*
    Kube instance.
    
    load modules onto kube instance

        map module files and mount accordingly
*/