const express = require('express');
const fs = require('fs');
const path = require('path');
const notes  = require('./Develop/db/db.json');

const app = express();

app.use(express.static('Develop'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );

    return note;

};

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes);
    res.json(req.body);

})


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.listen(PORT, (error) => {
    if(!error) {
    console.log(`Server now on port ${PORT}!`);
    } else {
    console.log("Error occured, server cannot start");
    };
});