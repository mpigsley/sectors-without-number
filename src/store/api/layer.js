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
      const layers = [];
      snapshot.forEach(doc => {
        layers.push({ ref: doc.ref, data: doc.data(), id: doc.id });
      });
      return Promise.all(
        layers.map(({ ref, data, id }) =>
          Promise.all([
            ref.collection('regions').get(),
            ref.collection('hexes').get(),
          ]).then(([regionSnapshot, hexSnapshot]) => {
            const fullObj = { ...data, id, regions: {}, hexes: {} };
            regionSnapshot.forEach(doc => {
              fullObj.regions[doc.id] = doc.data();
            });
            hexSnapshot.forEach(doc => {
              fullObj.hexes[doc.id] = doc.data();
            });
            return fullObj;
          }),
        ),
      ).then(layerArray =>
        layerArray.reduce(
          (obj, { id, ...layer }) => ({ ...obj, [id]: layer }),
          {},
        ),
      );
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
    .then(() => ({ key: regionId, region }));

export const deleteRegion = (sectorId, layerId, regionId) =>
  Firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .collection('regions')
    .doc(regionId)
    .delete();

export const createOrUpdateHex = (sectorId, layerId, hexId, hex) =>
  Firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .collection('hexes')
    .doc(hexId)
    .set(hex);

export const deleteHex = (sectorId, layerId, hexId) =>
  Firestore()
    .collection('layers')
    .doc(sectorId)
    .collection('layer')
    .doc(layerId)
    .collection('hexes')
    .doc(hexId)
    .delete();
