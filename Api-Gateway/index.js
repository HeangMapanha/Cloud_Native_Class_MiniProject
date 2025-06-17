const express = require('express');
const app = express()

//USE PROXY SERVER TO REDIRECT THE INCOMMING REQUEST
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer();

const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRETES = process.env.JWT_SECRETES;

function authToken(req, res, next) {
    console.log(req.headers.authorization)
    const header = req?.headers.authorization;
    const token = header && header.split(' ')[1];

    if (token == null) return res.status(401).json("Please send token");

    jwt.verify(token, JWT_SECRETES, (err, user) => {
        if (err) return res.status(403).json(err);
        req.user = user;
        next()
    })
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({message:"Unauthorized",userRole: req.user.role,})
            
        }
        next();
    }
}

app.use('/customer',authToken, authRole('customer'), (req, res) => {
    console.log("Customer API Access Granted")
    proxy.web(req, res, { target: 'http://34.227.158.32:5003' });
})

app.use('/admin', authToken, authRole('admin'),(req, res) => {
    console.log("Admin API Access Granted")
    proxy.web(req, res, { target: 'http://34.227.158.32:5002' });
})

app.use('/reg', (req, res) => {
    console.log("Registration Access Granted")
    proxy.web(req, res, { target: 'http://52.207.236.53:4001' });
})

app.use('/log', (req, res) => {
    console.log("login Access Granted")
    proxy.web(req, res, { target: 'http://52.207.236.53:4002' });
})

app.listen(4000, () => {
    console.log("API Gateway Service is running on PORT NO : 4000")
})