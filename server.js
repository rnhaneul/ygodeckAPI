const express = require("express");
const path = require("path");
const { connectToDatabase } = require("./db");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "search.html"));
});

app.get("/card/details", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cardDetails.html"));
});

app.get("/account", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "account.html"))
})

let users = [];
// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  res.status(200).json({ message: "Login successful" });
});

// Register a new user
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "Username is already taken" });
  }

  users.push({ username, password });

  res.status(201).json({ message: "User registered" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});