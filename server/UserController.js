const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const fs = require('fs');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3002;
app.use(cors());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
app.use(bodyParser.json());


const db = mysql.createPool({
host: "localhost",
user: 'root',
password:'rootmysqlpassword',
database:'mytooldb'

})


app.get("/api/users", (req, res) => {
  db.query("SELECT id,username, name, email, phonenumber,gender, role FROM users", (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving users');
    } else {
      res.send(results);
    }
  });
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting user");
    } else if (result.affectedRows === 0) {
      res.status(404).send(`User with ID ${id} not found`);
    } else {
      res.send(`User with ID ${id} deleted successfully`);
    }
  });
});


app.post("/api/insert", (req, res) => {
  const { username, name, password, email, role, gender, phonenumber, id_publique } = req.body;
  console.log(req.body);
  const sql = 'INSERT INTO users (username, name, password, email, role, gender, phonenumber,id_publique) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
  const values = [username, name, password, email, role, gender, phonenumber,id_publique];

  db.query(sql, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error inserting user');
    } else {
      res.send('User inserted successfully');
    }
  });
});

app.put("/api/update/:id", (req, res) => {
  const { username, name, password, email, role, phonenumber } = req.body;
  const id = req.params.id;

  // Check if id is undefined or null
  if (!id) {
    res.status(400).send('Invalid request: missing id parameter');
    return;
  }

  const sql = 'UPDATE users SET username=?, name=?, password=?, email=?, role=?, phonenumber=? WHERE id=?';
  const values = [username, name, password, email, role, phonenumber,id];

  db.query(sql, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error updating user');
    } else {
      res.send('User updated successfully');
    }
  });
});


// Chemin vers le répertoire contenant les fichiers de test
const testDirectory = 'C:/Users/BLabbenne/source/repos/inputs';

app.get('/tests', (req, res) => {
  // Lister tous les fichiers dans le répertoire de test
  fs.readdir(testDirectory, (err, files) => {
    if (err) {
      console.error(`Erreur lors de la lecture du répertoire de tests: ${err}`);
      res.status(500).send('Erreur lors de la récupération de la liste des fichiers de test');
      return;
    }

    // Filtre les fichiers pour ne conserver que les fichiers JSON
    const testFiles = files.filter((file) => file.endsWith('.json'));

    // Renvoyer la liste des fichiers de test disponibles au format JSON
    res.json(testFiles);
  });
});

// Endpoint pour supprimer un fichier
app.delete('/api/delete/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `C:/Users/BLabbenne/source/repos/inputs/${fileName}.json`;

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du fichier' });
    } else {
      res.sendStatus(200); // Réponse OK si le fichier est supprimé avec succès
    }
  });
});


app.get('/json-data', (req, res) => {
  const filePath = req.query.filePath;

  // Read the JSON file from the local file system using the provided file path
  fs.readFile(filePath,'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read JSON file' });
    }

    try {
      const jsonData = JSON.parse(data);
      return res.json(jsonData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to parse JSON data' });
    }
  });
});


app.get('/iframe', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Missing url parameter');
  }
  request(url, (error, response, body) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    const baseTag = '<base href="' + url + '">';
    const htmlWithBaseTag = body.replace(/<head>/i, '<head>' + baseTag);
    res.send(htmlWithBaseTag);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
