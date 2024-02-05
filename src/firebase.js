
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore/lite';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
const firebaseConfig = {
apiKey: "AIzaSyAzw37y2gjvVipsfDYAKlItOy1CMGgxQ4k",
authDomain: "atma-successful.firebaseapp.com",
projectId: "atma-successful",
storageBucket: "atma-successful.appspot.com",
messagingSenderId: "276088163912",
appId: "1:276088163912:web:09b11e412d4939a386d27d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app)
export { auth, firestore };