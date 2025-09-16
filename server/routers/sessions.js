const express = require('express');
const router = express.Router();


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json({ message: `Session ID: ${id}` });
});

module.exports = router;