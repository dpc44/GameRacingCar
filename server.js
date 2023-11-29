import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin'
import {credentials} from './credentials.js'
import cors from 'cors';

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://fir-cartraffic-default-rtdb.firebaseio.com"
});
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

    // Send the UID as the response
    res.json({ uid });
  } catch (error) {
    console.error('Error decoding ID token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});