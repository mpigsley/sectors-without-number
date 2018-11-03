import Firebase from 'firebase/app';
import { forEach } from 'constants/lodash';

export const createLayer = (sectorId, layer) =>
  Firebase.firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .add(layer)
    .then(doc => ({ layerId: doc.id, layer }));

export const updateLayer = (sectorId, layerId, layer) =>
  Firebase.firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .set(layer, { merge: true })
    .then(() => ({ layerId, layer }));

export const updateLayers = (sectorId, layers) => {
  const batch = Firebase.firestore().batch();
  forEach(layers, (update, layerId) =>
    batch.update(
      Firebase.firestore()
        .collection('layers')
        .doc(sectorId)
        .collection('layer')
        .doc(layerId),
      update,
    ),
  );
  return batch.commit();
};

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
