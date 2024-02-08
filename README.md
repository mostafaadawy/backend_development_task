# Backend Development Task

This Repo is created to fullfill required technichal tasks as Follows

## Instructions: for Backend Development Node.js and Express.js:

- Task 1: Create a simple Express.js server with a single endpoint that returns
  "Hello, World!" when accessed.

- Task 2: Implement a RESTful API endpoint /patients that returns a list of
  dummy patient data (name, age, medical history).

## Task 1:

- first we create a project folder

```sh
mkdir backend_development_task
```

- cd inside the folder and call the IDE

```sh
cd backend_development_task
code .
```

- in order to create express server we need the package.json

```sh
npm init
```

- then follow the required instructions and we will git the next package.json
  file

```json
{
  "name": "backend_development_task",
  "version": "1.0.0",
  "description": "task requiremnt",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "mostafa adawy",
  "license": "ISC"
}
```

- now in order to use express we need to install it first

```sh
npm i express
```

- now we can use express to create the server and return "Hello World"
-
- create the index.js file

```sh
touch first_task.js
```

- edit firt_task.js as follows:

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  const response = {
    message: 'Hello, world!'
  };
  res.json(response);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

- as we can see in the first task we require express then take an instance of
  express
- we define port in our simple task as const while in more advanced cases we get
  it from config file
- create our single end point
- then begin listening on the target port
- in order to run our task we edit the scripts sections in the package.json
  while we can execute it using node directly but scripts are more orgnized
  method
- edit the scripts section in the package.json

```json
  "scripts": {
    "first_task": "node first_task.js"
  },
```

- we can run the task

```sh
npm run second_task
```

- now you can use thunder, httpie, or postman or other similar programs or
  packages to test the http client end point using `get` method and the link
  `localhost:3000`

## Task 2:

- In order to implement the second task "RESTful API endpoint /patients that
  returns a list of dummy patient data (name, age, medical history)" create the
  second_task.js file

```sh
touch second_task.js
```

- edit second_task.js as follows:

```js
const express = require('express');
const app = express();
const PORT = 3000;

const patients = [
  { name: 'John Doe', age: 35, medical_history: 'Hypertension' },
  { name: 'Jane Smith', age: 28, medical_history: 'Diabetes' },
  { name: 'Michael Johnson', age: 42, medical_history: 'Asthma' }
];

app.get('/patients', (req, res) => {
  res.json(patients);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

- as we can see in the second task we require express then take an instance of
  express
- we define port in our simple task as const while in more advanced cases we get
  it from config file
- create our single end point
- then begin listening on the target port
- in order to run our task we edit the scripts sections in the package.json
  while we can execute it using node directly but scripts are more orgnized
  method
- edit the scripts section in the package.json

```json
  "scripts": {
    "second_task": "node second_task.js"
  },
```

- we can run the task

```sh
npm run second_task
```

- now you can use thunder, httpie, or postman or other similar programs or
  packages to test the http client end point using `get` method and the link
  `localhost:3000/patients`
- Note that in this task we use const array for simplicit, but we can also use
  NOSQL database or even SQL but using any of these methods require some other
  configurations

## Other methods NOSQL DB

- if you want to use NOSQL mongoose do the follwing steps
  - install mongoose

```sh
npm install  mongoose
```

- - create `second_task_nosql.js`

```sh
touch second_task_nosql.js
```

- - edit `second_task_nosql.js`

```js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/patientsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  medical_history: String
});

const Patient = mongoose.model('Patient', patientSchema);

app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/patients', async (req, res) => {
  const { name, age, medical_history } = req.body;
  if (!name || !age || !medical_history) {
    return res
      .status(400)
      .json({ error: 'Name, age, and medical_history are required' });
  }

  try {
    const newPatient = new Patient({
      name,
      age,
      medical_history
    });
    await newPatient.save();
    res
      .status(201)
      .json({ message: 'Patient created successfully', patient: newPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

- the new modification in this code can be found in adding connection (so you
  need to install mongo on your pc)
- then creating the schema and model and in the get endpoint we get the required
  records
- i also added new endpoint to add records just for testing issues
- - edit the script

```json
  "scripts": {
    "first_task": "node first_task.js",
    "second_task": "node second_task.js",
    "second_task_nosql": "node second_task_nosql.js"
  },
```

- - you can test as previous example with the same links after runing
    `npm run second_task_nosql`

## Other methods SQL DB

- if you want to use SQL MySql do the follwing steps
  - install mysql

```sh
npm install  mysql
```

- - create `second_task_sql.js`

```sh
touch second_task_sql.js
```

- - edit `second_task_sql.js`

```js
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
```

- the new modification in this code can be found in adding connection (so you
  need to install mysql on your pc)
- then creating the db table patients and in the get endpoint we get the
  required records
- i also added new endpoint to add records just for testing issues
- - edit the script

```json
  "scripts": {
    "first_task": "node first_task.js",
    "second_task": "node second_task.js",
    "second_task_nosql": "node second_task_nosql.js",
    "second_task_sql": "node second_task_sql.js"
  },
```

- - you can test as previous example with the same links after runing
    `npm run second_task_sql`

## Note that this is considered a simple example

the real case requires more complectated issues as follows

- clean code and code structure so we can use `nestjs`
- software design architecture for separatation of concerens such as MVC
- authentication using passport or jwt
- autherization
- sentization
- validation
- other security packages for rate throttling and etc
