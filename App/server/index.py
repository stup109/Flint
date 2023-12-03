from flask import Flask, render_template
import subprocess

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/update_hostname', methods=['POST'])
def update_hostname():
    if request.method == 'POST':
        new_hostname = request.form['new_hostname']
        subprocess.call(['hostnamectl', 'set-hostname', new_hostname])
        return f'Hostname updated to {new_hostname}'
    else:
        return 'Only POST requests are allowed'

if __name__ == '__main__':
    app.debug = True
    app.run()
