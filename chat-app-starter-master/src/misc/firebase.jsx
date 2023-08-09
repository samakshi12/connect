import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDwE7lwFKyIp3dRGsHoyCHxkM0wIOwM2Ww",
    authDomain: "connect-48ef4.firebaseapp.com",
    projectId: "connect-48ef4",
    storageBucket: "connect-48ef4.appspot.com",
    messagingSenderId: "566455215935",
    appId: "1:566455215935:web:8d956adedd35b57c27158a",
    measurementId: "G-LZQ10H6N7Q"
  };

  const app = firebase.initializeApp(config);

  export const auth= app.auth();
  export const database= app.database();