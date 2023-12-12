import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin'
import { getDatabase, ref, get, update } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { credentials } from './credentials/credentials.js'
import cors from 'cors';
const credentials = {
  "type": "service_account",
  "project_id": "fir-cartraffic",
  "private_key_id": "bf54102d7001f3dadff6e41c151ae947fd48432f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqx8P/+lM6gKjz\nn3rl8GP81IomaOYBB7AfdAtAoLSkA/BIOA3NEDUD7Nkyw0spL2LWQVV5x2YKIk0i\n37vncjD7Rpiai4jUbyY24Q+xKgOQsLSSb+Y/OzRi7kUaBTe1rqzul6eXYblSqioz\nIwUOSmeRcZFMoeGnmWzJP4f0cii1v3HRF3vVIs/CJr/PHa/Zn7/eSpwtGN6NDlmP\nx6fa3Mmc+OyQpAOfzxKZ6vUYiUFNN9uLL31SpN8hHOypnxRahF3648qD6cF8Y7x9\nxf1E2cgUeJwRV53M/KGB/t/7es5UTFEzCeKOy1wYz2xQXI0d7zFUDueRp+FDDuCw\np+TO6YRPAgMBAAECggEAGQBidEYMYIMsuMW/MzcXHDttTM7h5S1f86rZvt4ICVQ+\nSARUw5GSK/9E6NvoU/YzolQxlEDEcnVaajbrhlLpqCT0paNfJmJt624quEVYp5pc\nRRfhUvPIPozNTFA5O1LVeZ8gEixkpMfJTRqHsfON5/VX+n+0eQR1WvJUZU0/zSN6\nZ3iiXu9Jcg89g36GRUu0I3nJ295E79V2TDwn+epUwTuw5ekZVwKB790Nl7GmSnmc\ntIbKzX5MZ5eEngN+mrFs4iJGKexYLSWfHkQhoFlNU+3joP/1QjEYE5zkrKmHOLxK\nsucFlPc9fVCzvchJRwz+OTFH6s9UlbXaTY7c/bIhaQKBgQDtsRezReZIRhBjPtuU\nD3JetX51QpXINlYZijrMQYP/92mEChqY5x63AEW1GtDTTvzYHoAFKF1EmPVUNE2k\nU3TSKnZy6JIelzxeuZS+xLl/IoM7eb7DK4SFr6CoNu3g7PKbos4S6A5yPZhrd/A1\nIMQB/pF2swzxJkiqp22x5/0uowKBgQC370jxIx6ZZaxxmvBnhO2dYHV8zFJqMua6\nMxyXIUkZLATOtADyinqhNq5BpvOe3PE9lqlQlCBLVRz/Phdnl0dFNNsETI2qYTk3\n+CLo32ky5jiqFBlwR47Mots558QQspA3/aOVe+ZNtrnaNIoBCixwx+0js5q2xVMF\n0aAqFPlKZQKBgASOKE4fQNKRxS6hvcOQqDh4cfv9UrGLmQrUQ1w2xTjanQMSzn+v\nrj8DmlJmOSpTkTTzILD4nRD7fXgnqHVFxC9i8PIy0toTO+z00Yz2aDeviaRSKP3E\nj72gKAwRQW3WHLAu5pQmLmCyHYGxwsDB5//ByTflJpJYkXvzyX5nW8rRAoGACCFy\ntv4Xby54Zfk0YU8V9dv6tY6OohUn79ksjV2yToOMntqEJDSM4S16nHpV0JLxswhC\n6cXye4ICqyHChRjB1MRWXiVIKdzsW5YDbQnbK53TqWkECtuO62rTiAa/uwE5sM/s\neEIm1w6ZvpSN+SfK+R1NVUOuNiAY4Gv4yYNt1aUCgYEAxSnUK6ifhJFGAyPWJm2A\n+DfIWtO+VSRe5vw/hfx3aQLJi/1LKNXStgT3ptaurk/+Kv2ukaZrvDGefotZNL64\nU5ULvIOY6XkZnUW/l5foR1Sv/CA4e3m61u3xg0/fFvvmL9aEmYXlSPmnkrwU4keI\n8aUWyi7i4B0ylixECUOk9NU=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-i6hjm@fir-cartraffic.iam.gserviceaccount.com",
  "client_id": "116849518778381438899",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i6hjm%40fir-cartraffic.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};
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