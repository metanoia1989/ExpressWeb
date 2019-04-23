var express = require('express');
var app = express();

app.get('/', (req, res) => res.send('hello world'));

app.get('/users/:userId/books/:bookId', (req, res) => res.send(req.params));



app.listen(3000, () => console.log('app listening on port 3000'));