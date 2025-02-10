// Import the functions you need from the SDKs you need
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3lcW6n-BTd8Ij-W89JqzIf2GuHPo5f3g",
  authDomain: "notificacoes-terapia.firebaseapp.com",
  projectId: "notificacoes-terapia",
  storageBucket: "notificacoes-terapia.firebasestorage.app",
  messagingSenderId: "1005776109523",
  appId: "1:1005776109523:web:31815fbb3adf5865667926",
  measurementId: "G-MNSELL4E7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);