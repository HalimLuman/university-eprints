# university-eprints


Download wsl2 and download ubuntu

In ubuntu terminal follow these steps in order to create an eprints project.

1. Updating the system first
sudo apt update
sudo apt upgrade -y

2. Installing the required dependencies
sudo apt install -y apache2 mysql-server perl make build-essential \
libdbd-mysql-perl libxml-libxml-perl libunicode-string-perl \
libtext-unidecode-perl wget tar

3. Starting mysql and apache and checking the status (whether it is active or not)
sudo systemctl enable apache2
sudo systemctl start apache2

sudo systemctl enable mysql
sudo systemctl start mysql

4. Secure MySql
sudo mysql_secure_installation
To the questions that will appear you will give this answers:
Remove anonymous users → YES
Disallow root login remotely → YES
Remove test database → YES
Reload privileges → YES

5. Downloading eprints
cd /tmp
wget https://files.eprints.org/3288/1/eprints-3.4.7.tar.gz
tar xzf eprints-3.4.7.tar.gz
cd eprints-3.4.7

6. Configuration of eprints
sudo ./configure
sudo make
sudo make install

7. Create eprints system user
sudo adduser eprints

8. Switch to eprints user
sudo su - eprints

echo 'export PATH=$PATH:/opt/eprints3/bin' >> ~/.bashrc
source ~/.bashrc

epadmin --help (If commands appear it means the configuration is correct, if you see an error do the following)

exit
sudo apt install -y libapache2-mod-perl2 libapache2-mod-perl2-dev
sudo apt install -y libapache2-request-perl
sudo a2enmod perl
sudo systemctl restart apache2
sudo su - eprints
echo 'export PATH=$PATH:/opt/eprints3/bin' >> ~/.bashrc
source ~/.bashrc
epadmin --help ( this time it should work )

9. Adding of apache include line
If you are in this directory eprints@(user):~$
exit
sudo nano /etc/apache2/apache2.conf
Include /opt/eprints3/cfg/apache.conf (Add this line to the bottom of the page that will appear)
CTRL+X, Y, Enter

10. Restart Apache and check status whether it is active
sudo systemctl restart apache2
sudo systemctl status apache2

11. Go back to eprints user
sudo su - eprints
/opt/eprints3/bin/epadmin reload universityrepo
exit

12. You will see apache default page in http://localhost so disable it by this command
sudo a2dissite 000-default.conf
sudo ln -s /opt/eprints3/cfg/apache/universityrepo.conf /etc/apache2/sites-enabled/

13. Restart and check status of apache again
sudo systemctl restart apache2
sudo systemctl status apache2




