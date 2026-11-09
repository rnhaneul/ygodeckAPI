const express = require("express");
const path = require("path");
const { connectToDatabase } = require("./db");
const session = require("express-session");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "lesbians4eva",
    resave: false,
    saveUninitialized: false,
    // cookie: function (req) {
    //   var match = req.url.match(/^\/([^/]+)/);
    //   return {
    //     path: match ? '/' + match[1] : '/',
    //     httpOnly: true,
    //     secure: req.secure || false,
    //     maxAge: 60000,
    //   };
    // },
  })
);

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

// middleware to test if authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else next('route');
}

// Login endpoint
app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ username, password });

    if (!existingUser) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }
    req.session.regenerate(function (err) {
      if (err) return next(err);

      req.session.user = username;

      req.session.save(function (err) {
        if (err) return next(err);

        return res.status(200).json({ message: "Login successful" });
      })
    })
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Register a new user
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    const result = await usersCollection.insertOne({
      username,
      password,
      createdAt: new Date(),
    });

    return res.status(201).json({
      id: result.insertedId,
      message: `User "${username}" registered successfully!`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});