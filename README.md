# FAANGCode
CIS4914 - Senior Project

## Steps to setup Database (for MacOS)
1. Install MariaDB with Homebrew:<br/>
   a) brew install mariadb
2. Start the database server:<br/>
   a) brew services start mariadb
3. Login as root (Note: password for sudo command is same as computer login password)<br/>
   a) sudo mysql -u root
4. Create a new user<br/>
   a) CREATE USER 'user1@localhost' IDENTIFIED BY 'password1';
5. Grant privileges to all databases and tables to the new created user<br/>
   a) GRANT ALL PRIVILEGES ON \*.\* TO user1@localhost';
6. Refresh privilage tale to make changes applied to the database<br/>
   a) FLUSH PRIVILEGES;
7. Exit the DBMS and login as new user<br/>
   a) exit;
   b) mysql -u user1 -p
   c) *when prompted for password* Password1
8. Create the database and select it<br/>
   a) CREATE DATABASE faangUsers;
   b) USE faangUsers;
9. Create the table<br/>
    a) CREATE TABLE user_signup;

## Steps to setup Database (for Ubuntu/Debian Linux)
1. Install MariaDB with apt<br/>
   a) sudo apt update
2. Add the repository that contains the pacakges to install mariaDB 11.5.2 on Ubuntu system<br/>
   a) curl -LsS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash -s -- --mariadb-server-version=11.5.2
3. Install MariaDB server and client packages from configured repositories<br/>
   a) sudo apt update
   b) sudo apt -y install mariadb-server mariadb-client
4. Start database server<br/>
   a) sudo systemctl start mariadb
5. Follow steps 4-9 from "Steps to setup Database (for MacOS)"<br/>
   
## Steps to run FAANGCode
1. In terminal clone the repository:<br/>
   a) git clone https://github.com/carolynw25/FAANGCode.git
2. Then cd into "faang_code" to start the FrontEnd<br/>
   a) Run "npm start"
3. In a separate terminal, cd into "faang_code/backend" to start the BackEnd<br/>
   a) Run "npm start"
