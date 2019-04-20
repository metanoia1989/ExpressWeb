const express = require('express');
const app = express();


app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { title: '哈哈哈大小', message: '清净自然凉'});
});

app.listen(3000, () => console.log('app listening on port 3000'));