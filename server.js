// server.js
// Used only for LOCAL development (npm start / npm run dev).
// Vercel does NOT use this file — it uses api/index.js instead.
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
