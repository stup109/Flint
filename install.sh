yum install ansible -y

cd /root/
wget https://raw.githubusercontent.com/stup109/Flint/main/Flint.yaml
ansible-playbook Flint.yaml
