const express = require("express");
const trafficRoutes = require("./routes/traffic");
const metricsRoutes = require("./routes/metrics");
const healthRoutes = require("./routes/health");

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static dashboard
app.use(express.static("public"));

// Routes
app.use("/traffic", trafficRoutes);
app.use("/metrics", metricsRoutes);
app.use("/health", healthRoutes);

app.listen(PORT, () => {
  console.log(`Load Balancer running on http://localhost:${PORT}`);
  console.log(`Dashboard available at http://localhost:${PORT}/dashboard.html`);
});
