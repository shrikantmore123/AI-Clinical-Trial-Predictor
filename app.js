const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");

const port = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/clinical_trial";

main()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("templates/index");
});

app.get("/login", (req, res) => {
  res.render("users/login");
});

app.get("/signup", (req, res) => {
  res.render("users/signup");
});

app.get("*", (req, res) => {
  res.status(404).send("404 | Page Not Found");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
