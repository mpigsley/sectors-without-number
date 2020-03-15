import Firebase from 'firebase/app';

export const createCustomTag = (uid, tag) => {
  if (!uid) {
    throw new Error('User ID must exist to create a custom tag.');
  }
  const newTag = { ...tag, creator: uid };
  return Firebase.firestore()
    .collection('tags')
    .add(newTag)
    .then(doc => ({ tagId: doc.id, tag: newTag }));
};

export const updateCustomTag = (tagId, tag) =>
  Firebase.firestore()
    .collection('tags')
    .doc(tagId)
    .set(tag, { merge: true })
    .then(() => ({ tagId, tag }));

export const deleteCustomTag = tagId =>
  Firebase.firestore()
    .collection('tags')
    .doc(tagId)
    .delete();

export const getCustomTags = uid =>
  Firebase.firestore()
    .collection('tags')
    .where('creator', '==', uid)
    .get()
    .then(snapshot => {
      let tags = {};
      snapshot.forEach(doc => {
        tags = { ...tags, [doc.id]: doc.data() };
      });
      return tags;
    });
