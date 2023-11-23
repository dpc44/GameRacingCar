import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { getDatabase, ref, set, update, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { firebaseConfig, setNewUID } from "./FireBaseConfig.js";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(function () {
            var user = auth.currentUser;

            var user_data = {
                email: email,
                password: password,
                skills: [
                    { name: 'shieldLevel', level: 0, money: 1000, effect: 0 },
                    { name: 'X2PointLevel', level: 0, money: 1000, effect: 0 },
                    { name: 'bounusLevel', level: 0, money: 1500, effect: 0 }
                ],
                BestScoreLevelMode: ["00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00"],
                BestScoreChallengeMode: 0,
                startCashNumber: 0,
                LastLogin: Date.now()
            }
            const databaseRef = ref(database, 'users/' + user.uid);
            set(databaseRef, user_data);

            alert("created user")
        }).catch(function (error) {
            alert(error)
        });
}
function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(function () {
            var user = auth.currentUser;

            var user_data = {
                LastLogin: Date.now()
            }

            const databaseRef = ref(database, 'users/' + user.uid);
            update(databaseRef, user_data);

            window.location.href = 'index.html';
        }).catch(function (error) {
            alert(error)
        });
}

//Sign in with gogole

function signInWithGoogle() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            const databaseRef = ref(database, 'users/' + user.uid);
            
            get(databaseRef)
                .then((snapshot) => {
                    if (!snapshot.exists()) {
                        const email = user.email;
                        const userData = {
                            email: email,
                            skills: [
                                { name: 'shieldLevel', level: 0, money: 1000, effect: 0 },
                                { name: 'X2PointLevel', level: 0, money: 1000, effect: 0 },
                                { name: 'bounusLevel', level: 0, money: 1500, effect: 0 }
                            ],
                            BestScoreLevelMode: ["00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00"],
                            BestScoreChallengeMode: 0,
                            startCashNumber: 0,
                            LastLogin: Date.now()


                        };
                        set(databaseRef, userData);
                        
                    }
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error('Error retrieving user data:', error);
                });
        })
        .catch((error) => {
            console.error('Google sign-in error:', error);
        });
}



window.signInWithGoogle = signInWithGoogle;
window.signIn = signIn;
window.register = register;