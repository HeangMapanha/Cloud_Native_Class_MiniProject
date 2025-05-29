const express = require('express');
const app = express()

//USE PROXY SERVER TO REDIRECT THE INCOMMING REQUEST
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer();

//REDIRECT TO THE STUDENT MICROSERVICE
app.all('/student/', (req, res) => {
    console.log("INSIDE API GATEWAY STUDENT ROUTE")
    proxy.web(req, res, { target: 'http://localhost:5000' });
})

//REDIRECT TO THE TEACHER MICROSERVICE
app.all('/teacher/', (req, res) => {
    console.log("INSIDE API GATEWAY TEACHER ROUTE")
    proxy.web(req, res, { target: 'http://localhost:5001' });
})

app.listen(4000, '0.0.0.0' , () => {
    console.log("API Gateway Service is running on PORT NO : ", 4000)
})