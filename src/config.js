import firebase from '@firebase/app'
import '@firebase/auth'
import "@firebase/database"
import '@firebase/firestore'
import '@firebase/storage'
import '@firebase/messaging'
import '@firebase/functions'

var config = {
    apiKey: "AIzaSyAJUaKjR44WnojFnPNf8u8QL5n0rsqRVW8",
    authDomain: "freecircle-56dc0.firebaseapp.com",
    databaseURL: "https://freecircle-56dc0.firebaseio.com",
    projectId: "freecircle-56dc0",
    storageBucket: "freecircle-56dc0.appspot.com",
    messagingSenderId: "387442449911"
  };
  
export const firebaseApp = firebase.initializeApp(config);