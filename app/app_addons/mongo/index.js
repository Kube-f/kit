
import Promise from 'bluebird';
const mongoClient = Promise.promisifyAll(require('mongodb').MongoClient, {suffix: 'Promise'});

export default function mongoAddon(kube) {
  const mongoNamespace = kube.namespace('mongo');

  mongoNamespace.def(function setupConnection() {
    kube.logger.trace('setting up mongo connection');
    
    const url = process.env.MONGO_URL;

    return mongoClient.connectPromise(url)
      .then(function handleConnection(err, { db }) {
        if(err) {
          kube.logger.error({err}, 'Error while connecting to mongodb');
        }
        return db();
      })
  });
}