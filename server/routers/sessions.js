const express = require('express');
const router = express.Router();
const axios = require('axios');

// Example route to get session details
const PY_SERVICE_URL = process.env.PYTHON_SERVICE_URL;

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Forwarding request for session ID: ${id} to Python service`);
    const pyRes = await axios.get(`${PY_SERVICE_URL}/session/${id}`);
    res.json(pyRes.data);
  } catch (error) {
    console.error(`Error communicating with Python service: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/:id/message", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  // Here you would typically handle the incoming message,
  // e.g., by saving it to a database or processing it.
  try {
    const pyRes = await axios.post(`${PY_SERVICE_URL}/process`, { message });
    console.log(pyRes.data);
    res.json(pyRes.data);
  } catch (error) {
    console.error(`Error communicating with Python service: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
  console.log(`Received message for session ${id}: ${message}`);
});

router.get("/:id/evaluation", async (req, res) => {
  const { id } = req.params;
  try {
    // Forward the request to Python service for evaluation
    const pyRes = await axios.get(`${PY_SERVICE_URL}/session/${id}/evaluation`);
    res.json(pyRes.data);
  } catch (error) {
    console.error(`Error fetching evaluation from Python service: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// This route will forward to Python
// app.post('/process', async (req, res) => {
//   const { message } = req.body;
//   try {
//     // Forward the message to Python service
//     const pyRes = await axios.post('http://localhost:6000/process', { message });
//     // Send Python's response back to the client
//     res.json(pyRes.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Python service error" });
//   }
// });

module.exports = router;