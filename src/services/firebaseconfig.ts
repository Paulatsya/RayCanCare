// firebaseConfig.ts
// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZYPjXoZVFD2m-c2wrubq27cTbhqUthHY",
  authDomain: "raycancare-ef812.firebaseapp.com",
  projectId: "raycancare-ef812",
  storageBucket: "raycancare-ef812.firebasestorage.app",
  messagingSenderId: "211671885285",
  appId: "1:211671885285:web:61c70b157f176896993b0c",
  measurementId: "G-0YFZ1HFZX4"
};

/* const firebaseConfig = {
    apiKey: "AIzaSyCzD_DA4fItAHM1SDlaicY6-9NDFKyS2Xw",
    authDomain: "raycancare-8c6ff.firebaseapp.com",
    projectId: "raycancare-8c6ff",
    storageBucket: "raycancare-8c6ff.firebasestorage.app",
    messagingSenderId: "768891718957",
    appId: "1:768891718957:web:f94d9b554a98448a6297a4",
    measurementId: "G-JEFD6896PK"
}; */

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the initialized services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
