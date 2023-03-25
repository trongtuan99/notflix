import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "notflix-77e19.firebaseapp.com",
  projectId: "notflix-77e19",
  storageBucket: "notflix-77e19.appspot.com",
  messagingSenderId: "576625949639",
  appId: "1:576625949639:web:203fc65f32a72548f0f7e2",
  measurementId: "G-VWZP3D8VL7"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;