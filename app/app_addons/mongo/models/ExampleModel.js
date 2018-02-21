import mongoose from 'mongoose';

export default function exampleModel(kube) {
    const exampleModelSchema = new mongoose.Schema({
        name: 'String'
    })
    mongoose.model('exampleModel', exampleModelSchema);
}