const express = require("express");
const router = express.Router();
const { generateRandomIP } = require("../utils/ipGenerator");
const { LoadBalancer } = require("../loadbalancer");

router.get("/simulate/:count?", (req, res) => {
  const count = parseInt(req.params.count) || 5;
  const results = [];
  for (let i = 0; i < count; i++) {
    const ip = generateRandomIP();
    const node = LoadBalancer(ip);
    results.push({ ip, node });
  }
  res.json(results);
});

module.exports = router;
