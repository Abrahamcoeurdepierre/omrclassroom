import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAVOR4xsRQlUFRFYw5AFA_7xQYO5i0uZIk",
    authDomain: "omrclassroom-84b07.firebaseapp.com",
    projectId: "omrclassroom-84b07",
    storageBucket: "omrclassroom-84b07.appspot.com",
    messagingSenderId: "1013522359440",
    appId: "1:1013522359440:web:9c7d84d8185f65ea466415"
  };

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { db , auth };