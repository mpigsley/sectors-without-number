import Firebase from 'firebase/app';

export const createRoute = (sectorId, route) =>
  Firebase.firestore()
    .collection('navigation')
    .doc(sectorId)
    .collection('routes')
    .add(route)
    .then(doc => ({ key: doc.id, route }));

export const deleteRoute = (sectorId, routeId) =>
  Firebase.firestore()
    .collection('navigation')
    .doc(sectorId)
    .collection('routes')
    .doc(routeId)
    .delete();

export const setVisibility = (sectorId, routeId, isHidden) =>
  Firebase.firestore()
    .collection('navigation')
    .doc(sectorId)
    .collection('routes')
    .doc(routeId)
    .set({ isHidden }, { merge: true });

export const getNavigationData = sectorId =>
  Firebase.firestore()
    .collection('navigation')
    .doc(sectorId)
    .collection('routes')
    .get()
    .then(snapshot => {
      const routes = {};
      snapshot.forEach(doc => {
        routes[doc.id] = doc.data();
      });
      return routes;
    });
