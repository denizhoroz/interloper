const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

const sessionsRouter = require('./routers/sessions');
app.use('/sessions', sessionsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

