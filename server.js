const express = require('express');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );

    return note;

};

app.get('/api/notes', (req, res) => {
    console.log(notes);
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    // console.log(req.body.id);
    // req.body.id = notes.length.toString();

    req.body.id = uuidv4();

    const note = createNewNote(req.body, notes);
    res.json(note);

})


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, (error) => {
    if(!error) {
    console.log(`Server now on port ${PORT}!`);
    } else {
    console.log("Error occured, server cannot start");
    };
});