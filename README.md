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
