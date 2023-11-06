const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/change-username', function(req, res) {
    const newUsername = req.body.username;
    // Do something with the new username
    res.send(`Username changed to ${newUsername}`);
});

app.listen(3000);