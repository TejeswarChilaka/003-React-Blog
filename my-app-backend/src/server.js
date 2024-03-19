// import express from "express";
// import { db, connectToDb } from "./db.js";

// const app = express();
// app.use(express.json());

// app.get("/api/articles/:name/name", async (req, res) => {
//   const { name } = req.params;
//   const article = await db.collection("articles").findOne({ name });
//   if (article) {
//     res.json(article);
//   } else {
//     res.sendStatus(404);
//   }
// });

// app.put("/api/articles/:name/likes", async (req, res) => {
//   const { name } = req.params;
//   await db.collection("articles").updateOne({ name }, { $inc: { likes: 1 } });
//   const article = await db.collection("articles").findOne({ name });
//   if (article) {
//     res.send(`The article ${article.name} has ${article.likes} likes!`);
//   } else {
//     res.send("Article not Found");
//   }
// });

// app.post("/api/articles/:name/comments", async (req, res) => {
//   const { name } = req.params;
//   const { by, comment } = req.body;
//   await db
//     .collection("articles")
//     .updateOne({ name }, { $push: { comments: [] } });
//   const article = await db.collection("articles").findOne({ name });
//   if (article) {
//     article.comments.push({ by, comment });
//     res.send(article.comments);
//   } else {
//     res.send("Article not Found");
//   }
// });

// connectToDb(() => {
//   console.log("Successfully connected to database");
//   app.listen(8000, () => {
//     console.log("Listening ");
//   });
// });

import express from "express";
import { db, connectToDb } from "./db.js";

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