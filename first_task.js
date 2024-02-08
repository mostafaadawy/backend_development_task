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
