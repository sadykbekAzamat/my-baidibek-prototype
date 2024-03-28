// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtksSIisErQzgX5RIgy4GKFrOubws_I_8",
  authDomain: "my-baidibek.firebaseapp.com",
  databaseURL: "https://my-baidibek-default-rtdb.firebaseio.com",
  projectId: "my-baidibek",
  storageBucket: "my-baidibek.appspot.com",
  messagingSenderId: "663766257444",
  appId: "1:663766257444:web:b71bad6ee443805e9b2db1",
  measurementId: "G-1XGY8GDDRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);