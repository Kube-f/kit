
import Promise from 'bluebird';
import models from './models'
const mongooseClient = Promise.promisifyAll(require('mongoose'), {suffix: 'Promise'});

export default function mongoAddon(kube) {
  const mongoNamespace = kube.namespace('mongo');
  
  kube.loadModule(models);

  mongoNamespace.def(function setupConnection() {
    kube.logger.trace('setting up mongo connection');
    
    const hostname = process.env.MONGO_URL;
    const database = process.env.DB_NAME;
    const user = process.env.DB_UNAME;
    const password = process.env.DB_PASSWORD;
    const connectionString = `mongodb://${user}:${password}@${hostname}/${database}?readPreference=secondary`

    return mongooseClient.connectPromise(connectionString)
      .then(function handleConnection(client, err) {
        if(err) {
          throw new Error(err);
        }
        kube.logger.info({database}, 'New connection to mongodb open');
        return client;
      })
      .catch(function handleMongoConnectionError(err) {
        kube.logger.error({err}, 'Error while connecting to mongodb');
      })
    
  });

}