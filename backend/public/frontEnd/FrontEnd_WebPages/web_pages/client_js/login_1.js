import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import {
        getAuth,
        GoogleAuthProvider,
        OAuthProvider,
        signInWithPopup,
      } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

      const firebaseConfig = {
        apiKey: "AIzaSyAMz26OAAgh3PTfOr4grMoUkXLuNY_nti8",
        authDomain: "polsar-learn.firebaseapp.com", // This must match your Firebase project
        projectId: "polsar-learn",
        storageBucket: "polsar-learn.appspot.com",
        messagingSenderId: "720070143478",
        appId: "1:720070143478:web:fd81b5226592ab19746bd7",
        measurementId: "G-XLG559EVMK",
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const auth = getAuth();

      // Google Sign-In
      async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          console.log("User:", user);
          // Handle successful login
        } catch (error) {
          console.error("Error during Google Sign-In:", error);
          alert(`Error during Google Sign-In: ${error.message}`);
        }
      }

      // Microsoft Sign-In
      async function signInWithMicrosoft() {
        const provider = new OAuthProvider("microsoft.com");
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          console.log("User:", user);
          // Handle successful login
        } catch (error) {
          console.error("Error during Microsoft Sign-In:", error);
          alert(`Error during Microsoft Sign-In: ${error.message}`);
        }
      }

      document
        .getElementById("googleLogin")
        .addEventListener("click", function () {
          signInWithGoogle();
        });

      document
        .getElementById("microsoftLogin")
        .addEventListener("click", function () {
          signInWithMicrosoft();
        });

      // Show Signup form and hide Login form
      document
        .getElementById("showSignup")
        .addEventListener("click", function () {
          document.getElementById("loginForm").classList.remove("active");
          document.getElementById("signupForm").classList.add("active");
          document.getElementById("formTitle").innerText = "Signup";
        });

      // Show Login form and hide Signup form
      document
        .getElementById("showLogin")
        .addEventListener("click", function () {
          document.getElementById("signupForm").classList.remove("active");
          document.getElementById("loginForm").classList.add("active");
          document.getElementById("formTitle").innerText = "Login";
        });

console.log("it working");