const express = require('express');
const path = require('path');
const  notes  = require('./Develop/db/db.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    
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