const express = require('express');

const fs = require('fs');

const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

const notes = require('./db/db');

//Used to set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Routes to  return data 
app.get('/api/notes', (req, res) => {
  
  res.json(notes);
});
//Routes to update  data 
app.post('/api/notes', (req, res) => {
  const note = req.body;
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notes)
  );
  res.json(notes);
});
//These are routes to return HTML
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
//app.listen needs to be at the end of the server js to give acess to a port for get and post 
  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });