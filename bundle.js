'use strict';

var app$1 = require('firebase/app');
var analytics = require('firebase/analytics');

// Import the functions you need from the SDKs you need
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
const app = app$1.initializeApp(firebaseConfig);
analytics.getAnalytics(app);