const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

let username = 'DefaultUser';

app.get('/', (req, res) => {
  res.render('index', { username });
});

app.post('/updateUsername', (req, res) => {
  const newUsername = req.body.username;
  username = newUsername;
  fs.writeFile('username.txt', username, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Error writing to file');
    } else {
      console.log('Username has been updated.');
      res.redirect('/');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
