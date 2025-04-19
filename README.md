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

### 3. Login as root  
(Note: password for `sudo` is your computer login password)
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

### 7. Exit and login as the new user:
```bash
exit
mysql -u user1 -p
# When prompted, enter: password1
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
  totalProblemsSolved INT DEFAULT 0,
  numEasy INT DEFAULT 0,
  numMedium INT DEFAULT 0,
  numHard INT DEFAULT 0
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

### 5. Follow steps 4–9 from **MacOS instructions**

---

## Steps to Set Up Database (Windows)

### 1. Install MariaDB from: https://mariadb.org/  
- If you change the install path, remember it.  
- If you set a password, remember it.  
- Enable UTF-8 as the default character set.  
- Remember the port number set.

### 2. Open Command Prompt and login as root:
```cmd
cd "\Program Files\MariaDB 11.5"
cd bin
mysql -u root -p or .\mysql -u root -p
```
*Note: If you changed the install path, use `PATH\MariaDB 11.5` instead.*

### 3. Follow steps 4–9 from **MacOS instructions**

---

## Steps to Run FAANGCode

### 1. Clone the repository:
```bash
git clone https://github.com/carolynw25/FAANGCode.git
```

### 2. Start the Frontend:
```bash
cd faang_code
npm install   # only the first time
npm start
```
*Note: If you get a babel error:*
```bash
del package-lock.json
rm -rf node_modules  # press Y if prompted
npm install
```

### 3. Start the Backend (in a separate terminal):
```bash
cd faang_code/backend
npm start
```

*Notes if errors occur:*
- For nodemon error in `faang_code`:  
  ```bash
  npm install
  npm install nodemon --save-dev
  ```

- For babel error:  
  ```bash
  npm ls babel-loader
  ```

---

## Steps to Set Up Chrome Extension

1. Go to Gemini API Developer Kit and request a key.  
2. Add the key to:  
   `faang_code/public/background/background.js` in the `GeminiAPI` function.

3. Build the project:
```bash
cd faang_code
npm run build
```

4. In Google Chrome, go to:  
   `chrome://extensions/`

5. Click **"Load unpacked"** and select the folder:  
   `FAANGCode/faang_code/public`

> Note: You may need to toggle **Developer mode** (top right corner). If code has changed since original download click "Reload" to update.

Now, when visiting a LeetCode problem, you can open the extension and have it analyze your code.

**Happy coding!**
