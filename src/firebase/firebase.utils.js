import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAfhpE_RrJtWE1nVqe8aKTv-lW99qCTtbw",
  authDomain: "store-383db.firebaseapp.com",
  databaseURL: "https://store-383db.firebaseio.com",
  projectId: "store-383db",
  storageBucket: "store-383db.appspot.com",
  messagingSenderId: "1080002429835",
  appId: "1:1080002429835:web:fa1c02b3755d426401258e",
  measurementId: "G-JFCGRWHSQ6",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.log("Error occured in creating user", e.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
