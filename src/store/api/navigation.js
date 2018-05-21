import Firestore from 'firebase/firestore';

export const createRoute = (sectorId, route) =>
  Firestore()
    .collection('navigation')
    .doc(sectorId)
    .collection('routes')
    .add(route)
    .then(doc => ({ key: doc.id, route }));

export const deleteRoute = (sectorId, routeId) =>
  Firestore()
    .collection('navigation')
    .doc(sectorId)
    .collection('routes')
    .doc(routeId)
    .delete();

export const setVisibility = (sectorId, routeId, isHidden) =>
  Firestore()
    .collection('navigation')
    .doc(sectorId)
    .collection('routes')
    .doc(routeId)
    .set({ isHidden }, { merge: true });

export const getNavigationData = sectorId =>
  Firestore()
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
