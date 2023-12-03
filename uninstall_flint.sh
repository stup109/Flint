firewall-cmd --zone=public --remove-port=3306/tcp --permanent
firewall-cmd --reload
yum remove mysql
