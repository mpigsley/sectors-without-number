import { firestore as Firestore } from 'firebase';

export const createLayer = (sectorId, layer) =>
  Firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .add(layer)
    .then(doc => ({ key: doc.id, layer }));

export const editLayer = (sectorId, layerId, layer) =>
  Firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .set(layer, { merge: true })
    .then(() => ({ key: layerId, layer }));

export const deleteLayer = (sectorId, layerId) =>
  Firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .delete();

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

export const createRegion = (sectorId, layerId, region) =>
  Firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .collection('regions')
    .add(region)
    .then(doc => ({ key: doc.id, region }));

export const editRegion = (sectorId, layerId, regionId, region) =>
  Firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .collection('regions')
    .doc(regionId)
    .set(region, { merge: true })
    .then(doc => ({ key: doc.id, region }));
