import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8VB9lU0JMzKYMEtvX5ImoqzdpIGJMBeM",
  authDomain: "ct-demo-firebase.firebaseapp.com",
  projectId: "ct-demo-firebase",
  storageBucket: "ct-demo-firebase.appspot.com",
  messagingSenderId: "968879602048",
  appId: "1:968879602048:web:2efb4919cfc9cc80f5a965",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
