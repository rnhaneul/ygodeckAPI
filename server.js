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

app.post("/users", async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        message: "Username and email are required.",
      });
    }

    const db = await connectToDatabase();
    const result = await db.collection("users").insertOne({
      username,
      email,
      createdAt: new Date(),
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error("Could not save user:", error);
    res.status(500).json({ message: "Could not save user." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});