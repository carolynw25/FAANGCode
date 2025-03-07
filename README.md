# FAANGCode
CIS4914 - Senior Project

## Steps to setup Database (for MacOS)
1. Install MariaDB with Homebrew:<br/>
   a) brew install mariadb
3. Start the database server:
   a) brew services start mariadb
5. Login as root (Note: password for sudo command is same as computer login password)
   a) sudo mysql -u root
7. Create a new user
   a) CREATE USER 'user1@localhost' IDENTIFIED BY 'password1';
8. Grant privileges to all databases and tables to the new created user
   a) GRANT ALL PRIVILEGES ON *.* TO user1@localhost';
9. Refresh privilage tale to make changes applied to the database
   a) FLUSH PRIVILEGES;
10. Exit the DBMS and login as new user
   a) exit;
   b) mysql -u user1 -p
   c) *when prompted for password* Password1
11. Create the database and select it
   a) CREATE DATABASE faangUsers;
   b) USE faangUsers;
12. Create the table
    a) CREATE TABLE user_signup;
## Steps to run FAANGCode
1. In terminal run: git clone https://github.com/carolynw25/FAANGCode.git
2. Then cd into "faang_code"
   a) Run "npm start" to start the FrontEnd
3. In a separate terminal, cd into "faang_code/backend"
   a) Run "npm start" to start the BackEnd
