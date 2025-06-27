const express = require('express');
const app = express();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken')
require('dotenv').config();



const JWT_SECRETES = process.env.JWT_SECRETES;
app.use(express.json());
const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');

app.post('/registration', (req, res) => {
    const pobj = new PersonModel({
        user_name: req.body.user_name,
        emailid: req.body.email,
        pass: req.body.password,
        mobile: req.body.mobile,
        role: req.body.role
    });
    console.log(req.body.name)
    PersonModel.findOne({ "emailid": req.body.email})
        .then(existingdocument => {
            if (existingdocument != null) {
                res.status(404).send("Email already existed")
            }
            else {
                pobj.save()
    .then(inserteddocument => {
        res.status(200).send('Information inserted into Database');
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    });
                  }
        })
        .catch(err => {
            res.status(500).send({message: err.message})
            })

})

app.post("/login", (req, res) => {
  console.log(req.body.email)
  console.log(req.body.password)

  PersonModel.find({ "emailid": req.body.email, "pass": req.body.password})
    .then(getsearchdocument => {
      console.log(getsearchdocument)
      if (getsearchdocument.length > 0) {
        const user = getsearchdocument[0];
        const token = jwt.sign({ email: req.body.email,role: user.role}, JWT_SECRETES, { expiresIn: '24h' })
        return res.json({ token })
      }
      else {
        res.status(400).send("Invalid user")
      }
    }) //CLOSE THEN
}//CLOSE CALLBACK FUNCTION BODY
)//CLOSE Post METHOD

app.delete('/login/delete', async (req, res) => {
  try {
    const deleted = await PersonModel.findOneAndDelete({
      "emailid": req.body.emailid,
      "pass": req.body.pass
    });

    if (deleted) {
      res.status(200).json({ message: "Account delete successfully" });
    } else {
      res.status(404).json({ message: "Account not found or already deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(4002,'0.0.0.0', () => {
    console.log('Authentication Service Server is running on PORT NO: 4002')
})