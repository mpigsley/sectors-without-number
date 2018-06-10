import { firestore as Firestore } from 'firebase';

export const createLayer = (sectorId, layer) =>
  Firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .add(layer)
    .then(doc => ({ key: doc.id, layer }));

export const deleteLayer = (sectorId, layerId) =>
  Firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .delete();

export const setVisibility = (sectorId, layerId, isHidden) =>
  Firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .set({ isHidden }, { merge: true });

export const getLayerData = sectorId =>
  Firestore()
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
