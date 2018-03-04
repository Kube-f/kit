export default function exampleModel(kube) {
    const exampleModelSchema = new kube.mongoose.Schema({
        id: 'String',
        x: 'Number',
        y: 'Number',
        width: 'Number',
        height: 'Number'
    })
    return kube.mongoose.model('example', exampleModelSchema);
}