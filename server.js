import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin'
import { getDatabase, ref, get, update } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { credentials } from './credentials/credentials.js'
import cors from 'cors';

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://fir-cartraffic-default-rtdb.firebaseio.com"
});

const firebaseConfig = {
  apiKey: "AIzaSyCgnCggg0jZT1fwlCX33RTJbkuNIGlFjDw",
  authDomain: "fir-cartraffic.firebaseapp.com",
  projectId: "fir-cartraffic",
  storageBucket: "fir-cartraffic.appspot.com",
  messagingSenderId: "228751207615",
  appId: "1:228751207615:web:437953b1f9070866d96a0a",
  measurementId: "G-7RKJ51V02W"
};
const firebaseApp = initializeApp(firebaseConfig);
const Firebaseauth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({}));
// Serve static files from the "Frontend" directory
app.use(express.static('Frontend', { index: 'Login.html' }));
app.use(express.json())
// Define a route for the root URL
app.get('/', (req, res) => {
  // Redirect to the "Login.html" page
  res.sendFile(path.join(__dirname, 'Frontend', 'Login.html'));
});


app.post('/decodeToken', async (req, res) => {
  const { token } = req.body;
  try {
    // Decode the ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    res.json({ uid });
  } catch (error) {
    console.error('Error decoding ID token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/getValue', async (req, res) => {

  try {
    const { field } = req.body; // Retrieve path from the request body
    let { token } = req.headers;
    const checkToken = await admin.auth().verifyIdToken(token);
    const uid = checkToken.uid;
    const path = `users/${uid}/${field}`;

    // Example path: users/rqQ0lLQDiQTs2W6ckJWh7IZJr792/BestScoreChallengeMode
    const dataRef = ref(db, path);
    const snapshot = await get(dataRef);
    const data = snapshot.val();
    res.json(data);
  } catch (error) {
    console.error('Firebase error:', error);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: error });
    }

    res.status(500).json({ error: 'Internal Server Error', details: error });

  }
});

app.post('/api/updateData', async (req, res) => {
  try {
    const { key, newData } = req.body;
    let { token } = req.headers;
    const checkToken = await admin.auth().verifyIdToken(token);
    const uid = checkToken.uid;
    const path = `users/${uid}`
    // Create a reference to the data location in Firestore
    const dataRef = ref(db, path);

    // Prepare the data update
    const dataUpdate = { [key]: newData };
    // Update the data in Firestore
    await update(dataRef, dataUpdate);

    console.log("Data updated successfully");
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: error });
    }
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
});


//---------------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});