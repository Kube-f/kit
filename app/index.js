const Kube = require('kube-f');
const Promise = require('bluebird');
const restify = require('restify');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Promise'});
const kubeInstance = new Kube();

export default function appInit() {

    const logLevel = process.env.LEVEL == 'prod' ? 'info' : 'trace' 

    //load restify
    const server = restify.createServer();

    //setup bunyan logger
    kubeInstance['logger'] = bunyan.createLogger({
        name: process.env.APP_NAME, 
        stream: bformat({
            outputMode: 'short'
        }),
        level: logLevel
    });

    //load services
    return fs.readdirPromise('./app')
        .filter(nonDirectories)
        .map(dir => mountBaseDirectory(dir)(server))
        .then(server.listen(process.env.PORT, function handleListenSuccess () {
            kubeInstance.logger.info(`setting up on port ${process.env.PORT}`);
        }))
        .catch(function handleInitError(err) {
            console.log(err)
            kubeInstance.logger.error({err}, 'Mounting error');
        })

}


function mountBaseDirectory(directoryName) {
    return function handleMountLevel(server) {
      return fs.readdirPromise(`./app/${directoryName}`)
          .filter(nonDirectories)
          .map(function handleBaseDirectoryItem(directoryItem) {
              kubeInstance.logger.info(`mounting ${directoryItem}`);
              const mountableDirectoryItem = require(`./${directoryName}/${directoryItem}`).default;
              try {
                  kubeInstance.mountModule(mountableDirectoryItem, server);
                  return
              } catch(error) {
                  console.log(error)
                  kubeInstance.logger.error('Illigal namespace function call outside of def scope')
              }
          })
    }

}

const nonDirectories = file => !file.includes('.')
