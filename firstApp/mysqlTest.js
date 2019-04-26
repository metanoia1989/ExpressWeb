import Express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import config from './config';

const app = Express();
const port = process.env.PORT || 3000;
const connection = mysql.createConnection(config.db.mysql);
connection.connect(err => {
    // 如果在这一步抛出错误 请检查数据库配置  比如权限 选中数据库是否存在等等..
    if (err) return console.log('数据库连接失败', err.message);
    console.log('数据库连接成功');  
});

app.use(bodyParser.urlencoded({ extended: false })); 

app.get('/', (req, res) => {
  connection.query("SELECT * FROM story", (error, results, fields) => {

  });
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