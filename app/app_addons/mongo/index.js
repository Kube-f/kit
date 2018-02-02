export default function mongoAddon(kube) {
  const mongoNamespace = kube.namespace('mongo');

  mongoNamespace.def(function setupConnection() {
    kube.logger.trace('setting up mongo connection');
    return 0;
  });
}