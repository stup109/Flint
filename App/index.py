from flask import Flask, render_template, request, redirect, url_for
import os
import subprocess

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    hostname = os.uname().nodename

    if request.method == 'POST':
        new_hostname = request.form['hostname']

        # Executing hostnamectl command
        subprocess.run(["hostnamectl", "set-hostname", new_hostname])

        # Writing new hostname to the file
        with open("/etc/hostname", "w") as f:
            f.write(new_hostname)

        return redirect(url_for('index'))

    return render_template('index.html', hostname=hostname)

if __name__ == '__main__':
    app.run(debug=True)