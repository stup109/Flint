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

app.post('/updateHostname', (req, res) => {
  const path_hostname = "/etc/hostname";
  const new_hostname = req.body.hostname;
  
  // Executing hostnamectl command
  exec(`hostnamectl set-hostname ${new_hostname}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Hostname has been set to: ${new_hostname}`);
  });

  // Writing new hostname to the file
  fs.writeFileSync(path_hostname, new_hostname, (err) => {
    if (err) throw err;
    console.log('The hostname has been updated.');
  });

  res.redirect('/');
});

app.post('/<Function Name>', (req, res) => {
  exec(`<command>`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`<Console Log Message>`);
  });

  res.redirect('/');
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
