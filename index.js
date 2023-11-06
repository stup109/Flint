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
  
  // ----- change hostname ---------------------------------------------
  // fs.writeFile('test.txt', hostname, (err) => {
  //   if (err) {
  //     console.error('Error writing to file:', err);
  //     res.status(500).send('Error writing to file');
  //   } else {
  //     console.log('Hostname has been updated.');
  //     res.redirect('/');
  //   }
  // });
  // Execute a shell command
  
  exec( "hostnamectl hostname ${new_hostname}" , (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout:\n${stdout}`);
  });

  
});

// ----------


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
