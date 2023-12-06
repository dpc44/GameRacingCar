import { firebaseConfig, newUID, setNewUID } from "./FireBaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged, signOut, getIdToken
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set, update, get, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { UserStorage, getStore, setStore } from "./StoragetokenFunction.js";



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const BASE_URL = 'http://localhost:3000';
const tokenObject = JSON.parse(localStorage.getItem(UserStorage));
const options = {
    headers: {
        'token': tokenObject.token,
    },
};


export async function getRefreshUserToken() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                reject("No user found");
            }
            try {
                const token = await user.getIdToken(true);
                resolve(token);
            } catch (error) {
                console.error("Error refreshing user token:", error);
                reject(error);
            }
        });
    });
}



export async function GetValueFireBase(field) {
    try {

        const response = await axios.post(`${BASE_URL}/api/getValue`, { field }, options);
        // Assuming the server returns data in the response.data property
        return response.data;
    } catch (error) {
        // Log details of the error response
        if (error.response) {
            console.error('Error response:', error.response.data);
        }

        throw error;
    }
}


export async function UpdateDataFireBase(key, newData) {
    try {
        // Assuming options is defined before this function is called
        const response = await axios.post(`${BASE_URL}/api/updateData`, {key, newData }, options);
        // Assuming the server returns data in the response.data property
        console.log("response: ", response)
    } catch (error) {
        // Log details of the error response
        if (error.response) {
            console.error('Error response:', error.response.data);
        }

        throw error;
    }
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

export async function decodeToken(token) {
    try {
        const response = await axios.post('http://localhost:3000/decodeToken', token);
        // console.log("decodeToken: ", response.data)
        return response.data;  // You may want to return the decoded token or other relevant data
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;  // Return null or handle the error as needed
    }
}

axios.interceptors.response.use(response => response, async error => {
    if (error.response.data.error.code === "auth/id-token-expired") {
        var token = await getRefreshUserToken();
        setStore(UserStorage, {token});
        // window.location.reload();
        const originalRequest = error.config;
        originalRequest.headers['token'] = token;
        originalRequest._retry = originalRequest._retry || false;
        if (!originalRequest._retry) {
            originalRequest._retry = true;
            return axios(originalRequest);
        }
    }
});