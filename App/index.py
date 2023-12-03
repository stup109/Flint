from flask import Flask, request
import os
import subprocess

app = Flask(__name__)

@app.route('/change_hostname', methods=['POST'])
def change_hostname():
    new_hostname = request.form['new_hostname']
    os.system(f'sudo hostname {new_hostname}')

    with open('/etc/hosts', 'r') as file:
        lines = file.readlines()

    with open('/etc/hosts', 'w') as file:
        for line in lines:
            if line.startswith('127.0.1.1'):
                file.write(f'127.0.1.1 {new_hostname}\n')
            else:
                file.write(line)

    return 'Hostname has been changed to ' + new_hostname

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)