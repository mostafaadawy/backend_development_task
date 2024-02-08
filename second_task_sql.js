const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 3308, // Specify the custom port number
  user: 'root',
  password: '',
  database: 'test'
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  connection.query(
    `CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    medical_history VARCHAR(255) NOT NULL
  )`,
    (err, results) => {
      connection.release();
      if (err) {
        console.error('Error creating table:', err);
        return;
      }
      console.log('Table "patients" created successfully.');
    }
  );
});

app.get('/patients', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    connection.query('SELECT * FROM patients', (err, results) => {
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json(results);
    });
  });
});

app.post('/patients', (req, res) => {
  const { name, age, medical_history } = req.body;
  if (!name || !age || !medical_history) {
    return res
      .status(400)
      .json({ error: 'Name, age, and medical_history are required' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    connection.query(
      'INSERT INTO patients (name, age, medical_history) VALUES (?, ?, ?)',
      [name, age, medical_history],
      (err, result) => {
        connection.release();

        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(201).json({
          message: 'Patient created successfully',
          patientId: result.insertId
        });
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
