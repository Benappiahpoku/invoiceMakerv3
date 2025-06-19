// firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHDMDEUNEEdIlrCgD8macVPCmZV8IAc4A",
    authDomain: "invoiceapp-fa025.firebaseapp.com",
    projectId: "invoiceapp-fa025",
    storageBucket: "invoiceapp-fa025.firebasestorage.app",
    messagingSenderId: "716845879152",
    appId: "1:716845879152:web:07d2260f3a2c99873f09b5"
  };
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)