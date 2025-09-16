const express = require('express');
const router = express.Router();


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json({ message: `Session ID: ${id}` });
});

router.post("/:id/message", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  // Here you would typically handle the incoming message,
  // e.g., by saving it to a database or processing it.
  console.log(`Received message for session ${id}: ${message}`);

  // For now, just echo back the message
  res.json({ reply: `You said: ${message}` });
});

module.exports = router;