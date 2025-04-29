import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDT70O6CttQIjSEGWyIBFMvwusaiUIEmQ4",
  authDomain: "miniblog-b8b89.firebaseapp.com",
  projectId: "miniblog-b8b89",
  storageBucket: "miniblog-b8b89.firebasestorage.app",
  messagingSenderId: "766223498076",
  appId: "1:766223498076:web:e05e40fd36ca9c9fde1f99",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
