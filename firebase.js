// firebase.js

const firebaseConfig = {
  apiKey: "AIzaSyDGwvoC1FYpQJoXnOYfKBFUXXktyxbF_20",
  authDomain: "chambal-store.firebaseapp.com",
  projectId: "chambal-store",
  storageBucket: "chambal-store.firebasestorage.app",
  messagingSenderId: "128187802259",
  appId: "1:128187802259:web:9ab09025ecffe582e86366",
  measurementId: "G-8H60CM4WT2"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();    