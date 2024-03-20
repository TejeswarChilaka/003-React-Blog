import fs from "fs";
import express from "express";
import { db, connectToDb } from "./db.js";
import admin from "firebase-admin";

const credentials = JSON.parse(fs.readFileSync("./firebase-adminsdk.json"));

admin.initializeApp({
  credential : admin.credential.cert(credentials)
})

const app = express();
app.use(express.json());

app.get(`/api/articles/:name`, async (req, res) => {
  const { name } = req.params;

  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

app.put("/api/articles/:name/likes", async (req, res) => {
  const { name } = req.params;
  await db.collection("articles").updateOne({ name }, { $inc: { likes: 1 } });
  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.send("Article not Found");
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { by, comment } = req.body;

  await db.collection("articles").updateOne({ name }, { $push: { comments: {by,comment} } });
  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.send("Article not Found");
  }
});

app.get('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection("loginInfo").findOne({ username, password });
  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});


 connectToDb(() => {
    console.log("Successfully connected to database");
    app.listen(8000, () => {
      console.log("Listening ");
    });
  });