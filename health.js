const express = require("express");
const router = express.Router();
const { nodeHealth } = require("../loadbalancer");

router.get("/", (req, res) => {
  res.json(nodeHealth);
});

router.post("/update", (req, res) => {
  const { node, status } = req.body;
  if (nodeHealth[node] !== undefined) {
    nodeHealth[node] = status;
    res.json({ message: `Health updated for ${node}`, nodeHealth });
  } else {
    res.status(400).json({ error: "Invalid node" });
  }
});

module.exports = router;
