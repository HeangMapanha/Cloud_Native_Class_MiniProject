
const e1 = require('express');
const app = e1();

//REG API
app.post('/addassignment', (req, res) => {
    res.send('<html><body>INSIDE assignment API..</body></html>');
});

app.get('/viewstudent', (req, res) => {
    res.send('<html><body>INSIDE viewing API..</body></html>');
});

app.delete('/removestudent', (req, res) => {
    res.send('<html><body>INSIDE remove API..</body></html>');
});

app.listen(5001, () =>
console.log('EXPRESS Server Started at Port No: 5001'));