import { firebaseConfig, newUID, setNewUID } from "./FireBaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
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

function signOutUser() {
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


async function decodeIdToken(idToken) {
    try {
        auth.getIdTokenResult(idToken).then((decodedToken) => {
            console.log(decodedToken)
        })
        return uid;
    } catch (error) {
        console.error('Error decoding ID token:', error);
        return null;
    }
}

var test = decodeIdToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYmQyOTllODU2MmU3MmYyZThkN2YwMTliYTdiZjAxMWFlZjU1Y2EiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoicGhhdCBjYW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSm4wTEFHV3k3UUJ5RHdvXzJIU1Z2aUp6bW1kc2E3cUxvOGRvdjZOeUNiPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Zpci1jYXJ0cmFmZmljIiwiYXVkIjoiZmlyLWNhcnRyYWZmaWMiLCJhdXRoX3RpbWUiOjE3MDExNjUwODksInVzZXJfaWQiOiJycVEwbExRRGlRVHMyVzZja0pXaDdJWkpyNzkyIiwic3ViIjoicnFRMGxMUURpUVRzMlc2Y2tKV2g3SVpKcjc5MiIsImlhdCI6MTcwMTE2NTA4OSwiZXhwIjoxNzAxMTY4Njg5LCJlbWFpbCI6ImNhb3BoYXQxMzA4OTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTU2NDA0NDg1MzgzNDc1MzkzNTIiXSwiZW1haWwiOlsiY2FvcGhhdDEzMDg5NkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.g2m7Y2Z2ydQH6P4gshr6syWejLDh8TNpTuq91o8gzpkZBb6npznlSObQ3qggoBlfdNR1HtHBARHZcxciy4qnAjQ-Exo5sEwOGIEyVVYyfq0ZUyKCBAan5ivPeud79VJuJ2klE0qcphviqmnZiEutVUebbYJPKvLKX6ax_L5Lr6n8Nn22jiYBGcDBV8jtSCFEIM3e_NYtU_G5AX0TCfFpZ3GJaCmHmuNMH3FTvwJZU9zpQKsb6rLjB3IdRhpzHUN2kCjgZZBrqDHT6hx6OVGp3scDAaoFc2ZUzEFl9mnDaosBYwWzI34Pn-QhELjuVQLqdcqcffeaL26ElWNxCIlBNA")
