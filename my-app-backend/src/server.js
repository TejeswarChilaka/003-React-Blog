import fs from "fs";
import express from "express";
import { db, connectToDb } from "./db.js";
import admin from "firebase-admin";

const credentials = JSON.parse(fs.readFileSync("./firebase-adminsdk.json"));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      res.sendStatus(400);
    }
  }

  req.user = req.user || {};
  next();

});

app.get(`/api/articles/:name`, async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection("articles").findOne({ name });
  if (article) {
    const likeIds = article.likeIds || [];
    article.canLike = uid && !likeIds.includes(uid);
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

//Likes
app.put("/api/articles/:name/likes", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;
  //const {action} = req.body;

  const article = await db.collection("articles").findOne({ name }); 

  if (article) {
    const likeIds = article.likeIds || [];
    const canLike = uid && likeIds.includes(uid);

    if ( canLike) {
      await db.collection("articles").updateOne(
        { name },
        { $inc: { likes: -1 }, $pull: { likeIds: uid } }
      );
    } else {
      await db.collection("articles").updateOne(
        { name },
        { $inc: { likes: 1 }, $push: { likeIds: uid } }
      );
    }
  

    const updatedArticle = await db.collection("articles").findOne({ name });
    res.send(updatedArticle);
  } else {
    res.sendStatus(404);
  }
});

//Comments
app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { comment } = req.body;
  const { email } = req.user;

  await db
    .collection("articles")
    .updateOne({ name }, { $push: { comments: { by : email, comment } } });
  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.send("Article not Found");
  }
});


app.get("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection("loginInfo").findOne({ username, password });
  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }
});

connectToDb(() => {
  console.log("Successfully connected to database");
  app.listen(8000, () => {
    console.log("Listening ");
  });
});
