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
## Steps to run FAANGCode
1. In terminal clone the repository:<br/>
   a) git clone https://github.com/carolynw25/FAANGCode.git
2. Then cd into "faang_code"<br/>
   a) Run "npm start" to start the FrontEnd
3. In a separate terminal, cd into "faang_code/backend"<br/>
   a) Run "npm start" to start the BackEnd
