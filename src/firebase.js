import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: "AIzaSyCe0D80XIUXvSJckBR78EfFxNy31X4iQJQ",
//   authDomain: "auth-d4b39.firebaseapp.com",
//   projectId: "auth-d4b39",
//   storageBucket: "auth-d4b39.appspot.com",
//   messagingSenderId: "699287387629",
//   appId: "1:699287387629:web:e98ad54a947fcdd42afbe4",
// };

//sportsbattle config

const firebaseConfig = {
  apiKey: "AIzaSyBodhQKUjfGppHVkz-gYWwsDKfkAC9U-2Y",
  authDomain: "onecricket-4f432.firebaseapp.com",
  databaseURL: "https://onecricket-4f432.firebaseio.com",
  projectId: "onecricket-4f432",
  storageBucket: "onecricket-4f432.appspot.com",
  messagingSenderId: "779539809464",
  appId: "1:779539809464:web:02dbbd46fc50e41490604d",
  measurementId: "G-EB248PG9NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
