
import Promise from 'bluebird';
const mongoClient = Promise.promisifyAll(require('mongodb').MongoClient, {suffix: 'Promise'});

export default function mongoAddon(kube) {
  const mongoNamespace = kube.namespace('mongo');

  mongoNamespace.def(function setupConnection() {
    kube.logger.trace('setting up mongo connection');
    
    const hostname = process.env.MONGO_URL;
    const database = process.env.DB_NAME;
    const user = process.env.DB_UNAME;
    const password = process.env.DB_PASSWORD;
    const connectionString = `mongodb://${user}:${password}@${hostname}/${database}?readPreference=secondary`

    return mongoClient.connectPromise(connectionString)
      .then(function handleConnection(client, err) {
        if(err) {
          throw new Error(err);
        }
        kube.logger.info({database}, 'New connection to mongodb open');
        return client;
      })
      .catch(function handleMongoConnectionError(err) {
        console.log(err);
        kube.logger.error({err}, 'Error while connecting to mongodb');
      })
    
  });

}