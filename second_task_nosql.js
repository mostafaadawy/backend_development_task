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
