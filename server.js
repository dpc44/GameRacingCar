import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "Frontend" directory
app.use(express.static('Frontend', { index: 'Login.html' }));

// Define a route for the root URL
app.get('/', (req, res) => {
  // Redirect to the "Login.html" page
  res.sendFile(path.join(__dirname, 'Frontend', 'Login.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});