# sphere
mongoDB app addon for kit.

## Installation

Execute the following commands in the root of your kit based application

```bash
$ git clone git@github.com:Kube-f/sphere.git ./app/app_addons/mongo
```
For yarn users:
```bash
$ yarn add mongodb
```
For npm users:
```bash
$ npm install --save mongodb
```

After you have done this, you will need to add and fill out the following environment variables in your `.env` file.

```
[database]
MONGO_URL=
DB_NAME=
DB_UNAME=
DB_PASSWORD=
```

## importing

The mongodb will be created under the `mongo` namespace, allowing it to be imported like so:
```javascript
const mongo = kube.namespace('mongo');
```

## Models

All models that you wish to define can be created under the `./app/app_addons/mongo/models`.
Once you have created a model file and used the provided example as guideline. you can add it to the bootstrapper in the same folder (`./app/app_addons/mongo/models/index.js`) by adding the following line.

```javascript
kube.mountModule(myModel); //myModel will need to imported at the top of the file
```

Once this is done, after initialisation of the app, the model can be accessed through the global kube scope like so:
```javascript
const ExampleModel = kube.mongoose.model('example');
const exampleModelInstance = new ExampleModel();
```

