const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => res.send('Got a Post request'));
app.put('/user', (req, res) => res.send('Got a Put request as /user'));
app.delete('/user', (req, res) => res.send('Got a Delete request as /user'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
