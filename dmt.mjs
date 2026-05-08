// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkYPx7NpFbdpmt-pNapu5FZn5HYWwCqvA",
  authDomain: "dmtool-34a7d.firebaseapp.com",
  projectId: "dmtool-34a7d",
  storageBucket: "dmtool-34a7d.firebasestorage.app",
  messagingSenderId: "682046414940",
  appId: "1:682046414940:web:816aefbd845e13b02f8699",
  measurementId: "G-YXQ3NGRF87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const ent=[];
const chkEnt=[];
var mode=0;
const pointData=[];
const rankData=[];
const snd = new Audio("sound/剣で斬る6.mp3");
const snd2 = new Audio("sound/重力魔法1.mp3");
const snd3 = new Audio("sound/魔法陣を展開.mp3");
snd.preload="auto"
snd2.preload="auto"
snd3.preload="auto"
var count = 0;



