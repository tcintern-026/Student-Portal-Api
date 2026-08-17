// api/index.js
// Vercel serverless entry point. Vercel treats every file in /api
// as a serverless function, so we just export the Express app —
// no app.listen() needed here.
const app = require("../app");

module.exports = app;
