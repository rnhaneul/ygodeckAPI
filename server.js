const express = require('express');
const path = require('path');
const getCard = require('./public/cardDetails.js').getCard;

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/card/:id/details', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cardDetails.html'));
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});