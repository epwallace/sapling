import firebase from 'firebase/app';
import 'firebase/database';
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

  export default firebase;
