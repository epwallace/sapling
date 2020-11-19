import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCy3hxKMNwgnOKiqNOJB3vT8wi_MS8C5NM",
    authDomain: "sapling-5158c.firebaseapp.com",
    databaseURL: "https://sapling-5158c.firebaseio.com",
    projectId: "sapling-5158c",
    storageBucket: "sapling-5158c.appspot.com",
    messagingSenderId: "207824118415",
    appId: "1:207824118415:web:f0fd5d741514e5d2f506fa"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  // create and return a user document in firebase
  export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { email, displayName } = user;
      try {
        await userRef.set({
          displayName,
          email,
          ...additionalData,
        });
      } catch (error) {
        console.error('Error creating user document', error);
      }
    }
    return getUserDocument(user.uid);
  };

  // retrieve user's data from firebase
  const getUserDocument = async (uid) => {
    if (!uid) return null;
    
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();

      // retrieve user's plant entries and store them in an array
      const entriesSnapshot = await firestore.doc(`users/${uid}`).collection('entries').orderBy('name').get();
      let entries = [];
      entriesSnapshot.forEach(entry => {
        
        entries.push({...entry.data(), id: entry.id})
      });

      return {
        uid,
        ...userDocument.data(),
        entries
      };
    } catch (error) {
      console.error('Error fetching user', error);
    }
  };

  export default firebase;
