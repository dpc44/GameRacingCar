import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { firebaseConfig } from "./FireBaseConfig.js";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(function(){
        var user = auth.currentUser;

        var user_data = {
            email:email,
            password:password,
            content:0,
            LastLogin: Date.now()
        }
        const databaseRef = ref(database, 'users/' + user.uid);
        set(databaseRef, user_data);
        
        alert("created user")
    }).catch(function(error){
        alert(error)
    });
}
function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then(function(){
        var user = auth.currentUser;

        var user_data = {
            LastLogin: Date.now()
        }
        const databaseRef = ref(database, 'users/' + user.uid);
        update(databaseRef, user_data);
        
        window.location.href = 'index.html';
    }).catch(function(error){
        alert(error)
    });
}
document.getElementById
window.signIn = signIn;
window.register = register;