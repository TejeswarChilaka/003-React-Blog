import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());

const findArticle =(name) => articleInfo.find((article) => article.name === name);

app.get('/api/articles/:name',async (req,res) =>{
  const {name} = req.params;
  const client = new MongoClient('mongodb://127.0.0.0:27017');
  await client.connect();
  const db = client.db("react-blog-db");
  const article = await db.collection("articles").findOne({ name});
  if (article){
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

app.put("/api/articles/:name/likes", (req, res) => {
 const { name } = req.params;
 const article = findArticle(name);
 if(article){
  article.likes += 1;
  res.send(`The article ${article.name} has ${article.likes} likes!`)
 }
 else{
  res.send("Article not Found");
 }
});

app.post("/api/articles/:name/comments", (req, res) => {
  const { name } = req.params;
  const { by,comment } = req.body;

  const article = findArticle(name);
  if(article){
   article.comments.push({by, comment });
   res.send(article.comments)
  }
  else{
   res.send("Article not Found");
  }
 });





app.listen(8000,()=>{
    console.log("Listening ")
});
