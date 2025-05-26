
const e1 = require('express');
const app = e1();

//REG API
app.post('/registration', (req, res) => {
    res.send('<html><body>INSIDE REGISTRATION API..</body></html>');
});

app.post('/login', (req, res) => {
    res.send('<html><body>INSIDE LOGIN API..</body></html>');
});

app.get('/search', (req, res) => {
    res.send('<html><body>INSIDE SEARCH API..</body></html>');
});

app.put('/updateprofile', (req, res) => {
    res.send('<html><body>INSIDE UPDATE PROFILE API..</body></html>');
});

app.delete('/del', (req, res) => {
    res.send('<html><body>INSIDE DELETE API..</body></html>');
});

app.listen(5000, () =>
console.log('EXPRESS Server Started at Port No: 5000'));