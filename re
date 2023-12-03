        - name: mysql setup - 1/2
          ansible.builtin.shell: |
            firewall-cmd --zone=public --add-port=3306/tcp --permanent
            firewall-cmd --reload
            sed -i.bak '5s/#/skip-grant-tables\n#/' "{{ mysql_cnf }}"
            systemctl start mysqld.service
            
        - name: mysql setup - 2/2
          ansible.builtin.shell: |
            sed -i '5s/skip-grant-tables/# skip-grant-tables/g' "{{ mysql_cnf }}"
