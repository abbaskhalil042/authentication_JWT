// import {express} from "express";
// import jwt from "jsonwebtoken"

const express = require("express");
const jwt = require("jsonwebtoken");

app = express();
const PORT = 3000;

const secretKey = "secretkey";

app.get("/", (req, res) => {
  res.json({
    message: "a simple msg",
  });
});
//profile
app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "abbas",
    email: "abbas@gmail.com",
  };
  //*jwt
  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});



app.post('/profile',verifyToken,(req,res)=>{
jwt.verify(req.bearerToken,secretKey,(err,authData)=>{
    if(err){
        // res.sendStatus(403) 
        res.send({result:"invalid token"})
    }else{
        res.json({message:"profile accessed",authData})
    }

})
})

//!* ******************** verifying the token 

function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization'];

    if(typeof bearerHeader!=='undefined'){
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
    }else{
        res.send({result:"token is not valid"})
    }
}

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
