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
