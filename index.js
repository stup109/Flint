const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

let hostname = os.hostname();

app.get('/', (req, res) => {
  res.render('index', { hostname });
});

app.post('/updateHostname', (req, res) => {
  const newHostname = req.body.hostname;
  hostname = newHostname;
  // fs.writeFile('/etc/hostname', hostname, (err) => {
  fs.writeFile('test.txt', hostname, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Error writing to file');
    } else {
      console.log('Hostname has been updated.');
      res.redirect('/');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
