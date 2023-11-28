import { firebaseConfig, newUID, setNewUID } from "./FireBaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set, update, get, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { UserStorage } from "./StoragetokenFunction.js";



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

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


export function GetValueFireBase(path) {
    const dataRef = ref(db, path);
    console.log(path)
    return new Promise((resolve, reject) => {
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            console.error('Firebase error:', error);
            reject(error);
        });
    });
}


export function UpdateDataFireBase(path, key, newData) {
    const dataRef = ref(db, path);
    const dataUpdate = { [key]: newData };
    console.log("newData2: ", newData)
    return new Promise((resolve, reject) => {

        update(dataRef, dataUpdate)
            .then(() => {
                console.log("Data updated successfully");
                resolve();
            })
            .catch((error) => {
                console.log("Error updating data:", error);
                reject(error);
            });
    });
}

function signOutUser(){
    signOut(auth)
        .then(() => {
            localStorage.removeItem(UserStorage);
            window.location.href = 'Login.html';
        })
        .catch((error) => {
            // Handle errors during logout
            console.error("Logout error:", error);
        });
}
window.signOutUser = signOutUser;

export async function getAllUsersData() {
    try {
        // Assuming you have a reference to the 'users' node in your database
        const usersRef = ref(db, 'users');

        // Retrieve data for all users
        const usersSnapshot = await get(usersRef);

        if (usersSnapshot.exists()) {
            // usersSnapshot.val() contains an object with user IDs as keys and user data as values
            const usersData = usersSnapshot.val();

            // Convert the object to an array, excluding the UID from each user's data
            const usersArray = Object.keys(usersData).map((userId) => {
                const userData = usersData[userId];
                // Exclude UID from user data
                const { uid, ...userDataWithoutUid } = userData;
                return userDataWithoutUid;
            });

            // Now you can work with usersArray
            console.log('Users Data:', usersArray);

            return usersArray;
        } else {
            console.log('No users found');
            return [];
        }
    } catch (error) {
        console.error('Error getting users data:', error);
        throw error;
    }
}
