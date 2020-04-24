import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyDctErSNqeka-L9dZ7hUWbq_ify9kUKg9U", // Auth / General Use
    authDomain: "hogwarts-study-tool.firebaseapp.com", // Auth with popup/redirect
    databaseURL: "https://hogwarts-study-tool.firebaseio.com", // Realtime Database
    storageBucket: "hogwarts-study-tool.appspot.com", // Storage
    messagingSenderId: "755168622286" // Cloud Messaging
  };

  const firebaseApp = firebase.initializeApp(config);

  export default firebaseApp;
  export const database = firebaseApp.database();
  export const auth = firebase.auth();