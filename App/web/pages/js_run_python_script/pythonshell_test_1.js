import { exec } from 'child_process';

const scriptPath = 'D:/react_projects/test1/src/pages/js_run_python_script/pythonshell_test_1.py';
const input = '"please count one to three for me."';

//直接下命令python test.py
exec(`python ${scriptPath} ${input}`, (error, stdout, stderr) => {
  if (error) {
    console.error(error);
    return;
  }
  
  console.log(stdout);
});


// const { exec } = require('node:child_process');
// exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });

// import {PythonShell} from 'python-shell';

// let options = {
//   mode: 'text',
//   pythonPath: 'D:/pythonshell_tests/pythonshell_test_1',
//   pythonOptions: ['-u'], // get print results in real-time
//   scriptPath: 'D:/pythonshell_tests/pythonshell_test_1',
//   args: ['value1', 'value2', 'value3']
// };

// PythonShell.run('pythonshell_test_1.py', options).then(messages=>{
//   // results is an array consisting of messages collected during execution
//   console.log('results: %j', results);
// });
// import {PythonShell} from 'python-shell';
// import {PythonShell} from 'python-shell';

// let options={
//     scriptPath:'D:/pythonshell_tests/pythonshell_test_1',
//     args:["dasf",23],
// };

// PythonShell.run("pythonshell_test_1.py",options,(err,res) => {
//     if(err) console.log(err);
//     if(res) console.log(res);
//     //else console.log(err,res);
// });