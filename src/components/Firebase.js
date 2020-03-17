import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDAf66KaPUJHL36yK8KB8DHICS2zes0fc",
  authDomain: "react-spas-training.firebaseapp.com",
  databaseURL: "https://react-spas-training.firebaseio.com",
  projectId: "react-spas-training",
  storageBucket: "react-spas-training.appspot.com",
  messagingSenderId: "266153010282",
  appId: "1:266153010282:web:5cd29d4e363d9a7149d613",
  measurementId: "G-F84G4V9E0N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
