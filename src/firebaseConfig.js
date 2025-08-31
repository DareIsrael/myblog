// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX_N8BCz4hss_00EpolZjdV1W2i_jQMY4",
  authDomain: "myblog-91210.firebaseapp.com",
  projectId: "myblog-91210",
  storageBucket: "myblog-91210.firebasestorage.app",
  messagingSenderId: "1013689767549",
  appId: "1:1013689767549:web:938fbcbe611e15a42e0314"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// export { db };




