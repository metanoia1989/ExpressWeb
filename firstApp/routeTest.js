import Express from 'express';
import bodyParser from 'body-parser';
import apiRouter from './routes/api';
import otherRouter from './routes/other';

const app = Express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false })); 

app.get('/', (req, res) => res.json({ msg: 'hello express'} ));

app.use('/api', apiRouter);
app.use('/other', otherRouter);


app.listen(port, () => {
    console.log(`Started on prot ${port}`);
});