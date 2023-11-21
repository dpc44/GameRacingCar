import { firebaseConfig, newUID, setNewUID } from "./FireBaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set, update, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Check if the user is logged in

function handleAuthStateChange(user) {
    if (user) {
        setNewUID(user.uid);
        console.log("set complete");
    } else {
        window.location.href = 'Login.html';
    }
}

export async function getUser() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            handleAuthStateChange(user); 
            resolve(); 
        });
    });
}


