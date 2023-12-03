firewall-cmd --zone=public --remove-port=3306/tcp --permanent
firewall-cmd --reload
rm -rf /var/lib/mysql/*
