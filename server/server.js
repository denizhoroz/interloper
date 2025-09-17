const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const PY_SERVICE_URL = process.env.PYTHON_SERVICE_URL;

app.use(cors());
app.use(bodyParser.json());

// Proxy root to Python service
app.get('/', async (req, res) => {
  try {
    const pyRes = await axios.get(`${PY_SERVICE_URL}/`);
    res.send(pyRes.data);
  } catch (err) {
    res.status(500).send('Python service not available');
  }
});

const sessionsRouter = require('./routers/sessions');
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

