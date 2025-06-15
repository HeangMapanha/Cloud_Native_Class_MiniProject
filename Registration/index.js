const express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

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
                res.status(404).send("email already existed")
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

    


app.listen(4001, () => console.log('EXPRESS registration server started at port: 4001'));