const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
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


// ----- get and set hostname ---------------------------------------------

app.post('/updateHostname', (req, res) => {
  const path_hostname = "/etc/hostname";
  const new_hostname = req.body.hostname;
  hostname = new_hostname;
  exec(`hostnamectl set-hostname ${hostname}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout:\n${stdout}`);

    // Write the new hostname to the file
    fs.writeFile(path_hostname, hostname, function (err) {
      if (err) return console.log(err);
      console.log('New hostname saved successfully.');
    });
  });

  res.redirect('/');
});

// ----------


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
