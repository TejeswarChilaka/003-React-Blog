import express from "express";

const app = express();

app.get(
    '/lyros',(req,res) =>{
        res.send("Hello Backend!!!");
    });