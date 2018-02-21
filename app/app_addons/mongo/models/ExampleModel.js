import mongoose from 'mongoose';

export default function exampleModel(kube) {
    const exampleModelSchema = new mongoose.Schema({
        name: 'String'
    })
    return mongoose.model('exampleModel', exampleModelSchema);
}