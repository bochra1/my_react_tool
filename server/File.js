const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const fs = require('fs');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3003;
app.use(cors());
// Chemin vers le répertoire contenant les fichiers de test
const filepath = 'C:/Users/bochra/OneDrive/Bureau/tests/R02OptimaExceptionReport1254';

app.get('/json-data', (req, res) => {
  // Read the JSON file from the local file system
  fs.readFile('C:/Users/bochra/OneDrive/Bureau/tests/R02OptimaExceptionReport1254.json', 'utf8', (err, data) => {
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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  