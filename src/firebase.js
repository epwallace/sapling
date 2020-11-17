import firebase from 'firebase/app';
import 'firebase/database'
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
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData,
        });
      } catch (error) {
        console.error('Error creating user document', error);
      }
    }
    return getUserDocument(user.uid);
  };

  // retrieve user document from firebase
  const getUserDocument = async (uid) => {
    if (!uid) return null;
    
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data(),
      };
    } catch (error) {
      console.error('Error fetching user', error);
    }
  };


  export default firebase;
