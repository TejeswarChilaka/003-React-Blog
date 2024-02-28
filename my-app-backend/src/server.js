import express from "express";

let articleInfo =[
  {
     name: 'split-js',
     likes: 0
  },
  {
    name: 'map-js',
    likes: 0
 },
 {
  name: 'filter-js',
  likes: 0
}
];

const app = express();
app.use(express.json());

app.put("/api/articles/:name/likes", (req, res) => {
 const { name } = req.params;
 const article = articleInfo.find(article => article.name === name);
 if(article){
  article.likes +=1;
  res.send(`The article ${article.name} has ${article.likes} likes!`)
 }
 else{
  res.send(`Article not Found`);
 }
});

app.listen(8000,()=>{
    console.log("Listening ")
});
