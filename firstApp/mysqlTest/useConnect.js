import mysql from 'mysql';
import config from '../config';

const conn = mysql.createConnection(config.db.mysql);
conn.connect(error => {
  if(error) return console.log('error.message');
  console.log('数据库连接成功 connect thread id', conn.threadId);
});

conn.query('SELECT * FROM story', (error, results, fields) => {
  if(error) throw error;
  console.log(JSON.stringify({
    results,
    error,
  }, null, ' '));
});

conn.end();