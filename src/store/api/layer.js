import Firebase from 'firebase/app';

export const createLayer = (sectorId, layer) =>
  Firebase.firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .add(layer)
    .then(doc => ({ layerId: doc.id, layer }));

export const editLayer = (sectorId, layerId, layer) =>
  Firebase.firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .set(layer, { merge: true })
    .then(() => ({ layerId, layer }));

export const deleteLayer = (sectorId, layerId) =>
  Firebase.firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .delete();

export const getLayerData = sectorId =>
  Firebase.firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .get()
    .then(snapshot => {
      const layers = {};
      snapshot.forEach(doc => {
        layers[doc.id] = doc.data();
      });
      return layers;
    });
