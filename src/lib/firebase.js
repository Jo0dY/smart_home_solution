// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

if (typeof window !== 'undefined') {
  window.grecaptchaReady = new Promise((resolve) => {
    if (window.grecaptcha) {
      resolve();
    } else {
      window.onload = () => {
        resolve();
      };
    }
  });
}