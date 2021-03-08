import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC4x0yaG02tmiohmxRmTU3DEtGMq9xT6CY",
    authDomain: "slack-clone-59c80.firebaseapp.com",
    projectId: "slack-clone-59c80",
    storageBucket: "slack-clone-59c80.appspot.com",
    messagingSenderId: "122681785067",
    appId: "1:122681785067:web:a91b2ddbc3f2cf4b309cae"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
