const fs = require('fs');
const os = require('os');
const readline = require('readline');
const exec = require('child_process').exec;

function changeHostname(newHostname) {
 // Set new hostname
 os.hostname(newHostname);

 // Read the current hosts file
 fs.readFile('/etc/hosts', 'utf8', function(err, data) {
    if (err) {
      console.log('An error occurred: ' + err.message);
      return;
    }

    // Split the file into lines
    var lines = data.split('\n');

    // Loop through each line
    for (var i = 0; i < lines.length; i++) {
      // Split the line into words
      var words = lines[i].split(' ');

      // If the line begins with '127.0.1.1', replace the old hostname with the new one
      if (words[0] === '127.0.1.1') {
        words[1] = newHostname;
        lines[i] = words.join(' ');
        break;
      }
    }

    // Write the new hosts file
    fs.writeFile('/etc/hosts', lines.join('\n'), function(err) {
      if (err) {
        console.log('An error occurred: ' + err.message);
        return;
      }

      console.log('Hostname has been changed to ' + newHostname);
    });
 });
}

const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

rl.question('Enter new hostname: ', function(newHostname) {
 changeHostname(newHostname);
 rl.close();
});