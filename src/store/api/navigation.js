import Firebase from 'firebase/app';
import { forEach } from 'constants/lodash';

export const createRoute = (sectorId, route) =>
  Firebase.firestore()
    .collection('navigation')
    .doc(sectorId)
    .collection('routes')
    .add(route)
    .then((doc) => ({ key: doc.id, route }));

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

export const updateRoutes = (sectorId, routes) => {
  const batch = Firebase.firestore().batch();
  forEach(routes, (update, routeId) =>
    batch.update(
      Firebase.firestore()
        .collection('navigation')
        .doc(sectorId)
        .collection('routes')
        .doc(routeId),
      update,
    ),
  );
  return batch.commit();
};

export const getNavigationData = (sectorId) =>
  Firebase.firestore()
    .collection('navigation')
    .doc(sectorId)
    .collection('routes')
    .get()
    .then((snapshot) => {
      const routes = {};
      snapshot.forEach((doc) => {
        routes[doc.id] = doc.data();
      });
      return routes;
    });
