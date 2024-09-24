const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api-routes");  // Import your API routes
const db = require("./models"); // Sequelize models

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static assets from the public folder (React will use this)
app.use(express.static("public"));

// Use API Routes
app.use("/api", apiRoutes);

// Sync the database and start the server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
