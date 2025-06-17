const express = require('express');
const app = express();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken')
require('dotenv').config();



const JWT_SECRETES = process.env.JWT_SECRETES;
app.use(express.json());
const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');
app.post("/login", (req, res) => {
  console.log(req.body.email)
  console.log(req.body.password)

  PersonModel.find({ "emailid": req.body.email, "pass": req.body.password})
    .then(getsearchdocument => {
      console.log(getsearchdocument)
      if (getsearchdocument.length > 0) {
        const token = jwt.sign({ email: req.body.email,}, JWT_SECRETES, { expiresIn: '24h' })
        return res.json({ token })
      }
      else {
        res.status(400).send("Invalid user")
      }
    }) //CLOSE THEN
}//CLOSE CALLBACK FUNCTION BODY
)//CLOSE Post METHOD


app.listen(4002, () => {
    console.log('Authentication Service Server is running on PORT NO: 4002')
})