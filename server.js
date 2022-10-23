const express = require('express');

const fs = require('fs');

const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

const notes = require('./db/db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const note = req.body;
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notes)
  );
  res.json(notes);
});

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });