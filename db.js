const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  if (db) return db;

  await client.connect();
  db = client.db("ygodeckAPI");

  console.log("Connected to MongoDB");
  return db;
}

module.exports = { connectToDatabase };