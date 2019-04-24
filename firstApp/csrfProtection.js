import Express from 'express';
import csrf from 'csurf';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from './config';

const app = Express();
const port = 3000;

const csrfProtection = csrf({ cookie: true });


const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  res.json(403, { code: -1, msg: err.toString() });
};

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser(config.cookieSecret));


app.get('/form', csrfProtection, (req, res) => {
  res.json({
    csrfToken: req.csrfToken(),
  });
});

app.post('/process', csrfProtection, (req, res) => {
  res.send('data is beging processed');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Started on prot ${port}`);
});