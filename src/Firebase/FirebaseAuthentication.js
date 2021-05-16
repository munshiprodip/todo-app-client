import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

// Initialize firebase
export const initializeAppfirebase = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};
initializeAppfirebase();

// Sign in with google
export const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((userCredential) => {
      const newUserInfo = userCredential.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

// Signout
export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sign out successfully");
    })
    .catch((error) => {
      console.log("Ops....");
    });
};

export const checkLoginUser = () => {
  firebase.auth().onAuthStateChanged((userAuth) => {
    console.log(userAuth);
    return userAuth;
  });
};

export const fireAuth = firebase.auth();
