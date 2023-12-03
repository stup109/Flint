from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/dashboard', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/change_hostname', methods=['POST'])
def change_hostname():
    data = request.get_json()

    if 'hostname' not in data:
        return jsonify({'error': 'Hostname not provided'}), 400

    new_hostname = data['hostname']

    try:
        # modifying /etc/hostname and change hostname
        with open('/etc/hostname', 'w') as hostname_file:
            hostname_file.write(new_hostname)
            
        os.system(f'hostnamectl set-hostname {new_hostname}')
        
        return jsonify({'message': 'Hostname changed successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': f'Error changing hostname: {str(e)}'}), 500

if __name__ == '__main__':
    app.debug = True
    app.run()
