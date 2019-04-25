import Express from 'express';
import bodyParser from 'body-parser';


const app = Express();
const port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(Express.static(__dirname + '/public'))

app.get(/^\/(index(\.html)?)?$/, (req, res) => {
  res.render('index', { title: '标题', message: '大家好' });
});

app.get('/pug/:filename', (req, res) => {
  const templateName = req.params.filename;
  res.render('pugStudy/' + templateName );
});

app.get('/ext/includes', (req, res) => {
  res.render('pugStudy/includes/index');
});

app.get('/ext/extends', (req, res) => {
  res.render('pugStudy/extends/index', { title: '模板继承' });
});

app.use((req, res, next) => {
  const err = new Error('Not Found Page');
  err.status = 400;
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.render('error', {
    statusCode,
    message: err.message,
    error: err,
  });
});

app.listen(port, () => {
    console.log(`Started on prot ${port}`);
});