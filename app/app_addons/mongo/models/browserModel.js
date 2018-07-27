export default function browserModel(kube) {
    const browserModelSchema = new kube.mongoose.Schema({
        id: 'String',
        x: 'Number',
        y: 'Number',
        width: 'Number',
        height: 'Number'
    })
    return kube.mongoose.model('browser', browserModelSchema);
}