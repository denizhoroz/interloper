const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const PY_SERVICE_URL = process.env.PYTHON_SERVICE_URL;

// Serve all sessions from sessions.json
router.get("/", (req, res) => {
  const sessionsPath = path.join(__dirname, '../../server/sessions.json');
  fs.readFile(sessionsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Error reading sessions.json:", err);
      return res.status(500).json({ error: "Could not read sessions.json" });
    }
    try {
      const sessionsData = JSON.parse(data);
      res.json({ sessions: sessionsData.sessions || [] });
    } catch (parseErr) {
      console.error("Error parsing sessions.json:", parseErr);
      res.status(500).json({ error: "Invalid sessions.json format" });
    }
  });
});

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

  // Forward the message to Python service
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

module.exports = router;