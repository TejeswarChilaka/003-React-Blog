import express from "express";

const app = express();
app.use(express.json());

app.get("/lyros", (req, res) => {
  res.send("Hello Backend!!!");
});

app.listen(8000,()=>{
    console.log("Listening ")
}) 