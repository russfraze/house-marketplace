import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwNvht4OJFpbf5wkzQZDP1aZ2WelRjh4Q",
  authDomain: "house-marketplace-app-83114.firebaseapp.com",
  projectId: "house-marketplace-app-83114",
  storageBucket: "house-marketplace-app-83114.appspot.com",
  messagingSenderId: "438154848964",
  appId: "1:438154848964:web:c7faf3f44bb9a740747791"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()