import Firebase from 'firebase/app';

export const createFaction = (sectorId, faction) =>
  Firebase.firestore()
    .collection('factions')
    .doc(sectorId)
    .collection('faction')
    .add(faction)
    .then(doc => ({ factionId: doc.id, faction }));

export const editFaction = (sectorId, factionId, faction) =>
  Firebase.firestore()
    .collection('factions')
    .doc(sectorId)
    .collection('faction')
    .doc(factionId)
    .set(faction, { merge: true })
    .then(() => ({ factionId, faction }));

export const deleteLayer = (sectorId, factionId) =>
  Firebase.firestore()
    .collection('factions')
    .doc(sectorId)
    .collection('faction')
    .doc(factionId)
    .delete();

export const getFactionData = sectorId =>
  Firebase.firestore()
    .collection('factions')
    .doc(sectorId)
    .collection('faction')
    .get()
    .then(snapshot => {
      const factions = {};
      snapshot.forEach(doc => {
        factions[doc.id] = doc.data();
      });
      return factions;
    });
