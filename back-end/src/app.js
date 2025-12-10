const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add a / root route so the service URL doesn't return "route not found"
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running. Use /api/health for health check and /api/* for endpoints.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "something went wrong",
    error: err.message,
  });
});

module.exports = app;
