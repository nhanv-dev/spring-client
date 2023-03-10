import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDxjAsVddCEBo2fHdL6D9fQ9DJVmoTgLeI",
    authDomain: "ecommerce-477f2.firebaseapp.com",
    projectId: "ecommerce-477f2",
    storageBucket: "ecommerce-477f2.appspot.com",
    messagingSenderId: "412193350652",
    appId: "1:412193350652:web:8f605cd465f9e298284879",
    measurementId: "G-BLMMZJRE94"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);