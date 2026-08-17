// app.js
const express = require("express");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const studentsRouter = require("./routes/students");

const app = express();

// ---- Core middleware ----
app.use(express.json());   // parse JSON request bodies
app.use(logger);           // custom request logger (bonus)

// ---- Routes ----

// GET / -> welcome / API index (route #1)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Student Portal API",
    endpoints: {
      allStudents: "GET /api/students",
      filterByDepartment: "GET /api/students?department=Computer Science",
      filterBySemester: "GET /api/students?semester=6",
      singleStudent: "GET /api/students/:id",
      createStudent: "POST /api/students",
      updateStudent: "PUT /api/students/:id",
      deleteStudent: "DELETE /api/students/:id",
      health: "GET /api/health",
    },
  });
});

// GET /api/health -> simple health check (route #2)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Mount CRUD routes for students (routes #3-#7: GET all, GET one, POST, PUT, DELETE)
app.use("/api/students", studentsRouter);

// ---- Custom 404 (bonus) ----
app.use(notFound);

module.exports = app;
