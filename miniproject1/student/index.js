const e1 = require('express');
const app = e1();

//REG API
app.post('/submitassignment', (req, res) => {
    res.send('<html><body>INSIDE submitting API..</body></html>');
});

app.post('/viewassign', (req, res) => {
    res.send('<html><body>INSIDE viewing API..</body></html>');
});

app.put('/updateprofile', (req, res) => {
    res.send('<html><body>INSIDE UPDATE PROFILE API..</body></html>');
});


app.listen(5000, '0.0.0.0',() =>
console.log('EXPRESS Server Started at Port No: 5000'));