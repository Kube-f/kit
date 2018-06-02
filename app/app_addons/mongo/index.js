
import Promise from 'bluebird';
import models from './models'
import uuid from 'uuid/v4';
const mongoose = require('mongoose');

export default function mongoAddon(kube) {
  const mongoNamespace = kube.namespace('mongo');
  
  kube['mongoose'] = mongoose;
  kube.mongoose.Promise = Promise;
  kube.loadModule(models);

  kube.logger.trace('setting up mongo connection');
  
  const { MONGO_URL, DB_NAME, DB_UNAME, DB_PASSWORD } = process.env;
  const connectionString = `mongodb://${DB_UNAME}:${DB_PASSWORD}@${MONGO_URL}/${DB_NAME}?readPreference=secondary`

  mongoNamespace.defSync(function createModel(name, data = {}) {
    if(!name || name.length < 1 || name == '') {
      return
    }

    const foundModel = kube.mongoose.model(name)
    if(foundModel) {
      return new foundModel(data);
    }
    return null;
  })

  mongoNamespace.defSync(function baseModel(name) {
    if(!name || name.length < 1 || name == '') {
      return
    }

    const foundModel = kube.mongoose.model(name)
    return foundModel ? foundModel : null;
  })

  return kube.mongoose.connect(connectionString)
    .then(function handleConnection(client, err) {
      if(err) {
        throw new Error(err);
      }
      kube.logger.info({DB_NAME}, 'New connection to mongodb open');
      return client;
    })
    .catch(function handleMongoConnectionError(err) {
      console.log(err)
      kube.logger.error({err}, 'Error while connecting to mongodb');
    })
}