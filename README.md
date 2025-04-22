# FAANGCode  
**CIS4914 - Senior Project**

---

## Steps to Set Up Database (MacOS)

### 1. Install MariaDB with Homebrew:
```bash
brew install mariadb
```

### 2. Start the database server:
```bash
brew services start mariadb
```

### 3. Login as root (password for `sudo` is your computer login password):
```bash
sudo mysql -u root
```

### 4. Create a new user:
```sql
CREATE USER 'user1'@'localhost' IDENTIFIED BY 'password1';
```

### 5. Grant privileges to the new user:
```sql
GRANT ALL PRIVILEGES ON *.* TO 'user1'@'localhost';
```

### 6. Refresh privilege table:
```sql
FLUSH PRIVILEGES;
```

### 7. Exit and login as the new user (enter `password1` when prompted):
```bash
exit
mysql -u user1 -p
```

### 8. Create the database and use it:
```sql
CREATE DATABASE faangUsers;
USE faangUsers;
```

### 9. Check if the database was created:
```sql
SHOW DATABASES;
```

### 10. Create the tables:
```sql
CREATE TABLE user_signup (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE user_data (
  id INT PRIMARY KEY,
  totalNumHintsEasy INT NOT NULL DEFAULT 0,
  totalNumHintsMedium INT NOT NULL DEFAULT 0,
  totalNumHintsHard INT NOT NULL DEFAULT 0,
  totalDebug INT NOT NULL DEFAULT 0,
  totalComplexity INT NOT NULL DEFAULT 0
);
```

### 11. Check if the tables were created:
```sql
SHOW TABLES;
```

---

## Steps to Set Up Database (Ubuntu/Debian Linux)

### 1. Install MariaDB:
```bash
sudo apt update
```

### 2. Add the MariaDB repository:
```bash
curl -LsS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash -s -- --mariadb-server-version=11.5.2
```

### 3. Install server and client:
```bash
sudo apt update
sudo apt -y install mariadb-server mariadb-client
```

### 4. Start the database server:
```bash
sudo systemctl start mariadb
```

### 5. Follow steps 4–9 from the MacOS section above

---

## Steps to Set Up Database (Windows)

### 1. Install MariaDB from the official site:  
[https://mariadb.org/](https://mariadb.org/)  
During installation:  
- Enable UTF-8 as the default character set  
- Remember the port and installation path if changed  
- Note the password you set for root

### 2. Open Command Prompt and login as root (adjust the path if needed):
```cmd
cd "\Program Files\MariaDB 11.5"
cd bin
mysql -u root -p
```

### 3. Follow steps 4–9 from the MacOS section above

---

## Steps to Run FAANGCode

### 1. Clone the repository:
```bash
git clone https://github.com/carolynw25/FAANGCode.git
```

### 2. Start the Frontend (run these inside `faang_code`):
```bash
cd faang_code
npm install
npm start
```

If you get a Babel error, try:
```bash
del package-lock.json
rm -rf node_modules
npm install
```

### 3. Start the Backend in a separate terminal:
```bash
cd faang_code/backend
npm start
```

If errors occur:

**Nodemon error**:
```bash
npm install
npm install nodemon --save-dev
```

**Babel error**:
```bash
npm ls babel-loader
```

---

## Steps to Set Up Chrome Extension

1. Go to Gemini API Developer Kit and request a key.  
2. Add the key to the `GeminiAPI` function inside:
```
faang_code/public/background/background.js
```

3. Build the project:
```bash
cd faang_code
npm run build
```

4. In Chrome, open the extension page:
```
chrome://extensions/
```

5. Click **Load unpacked** and select:
```
FAANGCode/faang_code/public
```

Make sure Developer Mode is enabled. Click **Reload** if you've made code changes.

Now, when visiting a LeetCode problem, open the extension to analyze your code.

---

**Happy coding!**
