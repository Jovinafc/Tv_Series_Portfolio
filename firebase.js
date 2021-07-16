import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBW5KdZRZq8fYOx5lPdimUMWa59aKR6zBg',
  authDomain: 'series-library.firebaseapp.com',
  projectId: 'series-library',
  storageBucket: 'series-library.appspot.com',
  messagingSenderId: '635752708519',
  appId: '1:635752708519:web:780a385a040556fa801e82',
  measurementId: 'G-4WWTB4Q8XF',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

const auth = app.auth();

export default db;

export { auth };
