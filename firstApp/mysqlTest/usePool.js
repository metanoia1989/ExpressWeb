import mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool(config.db.mysql);

pool.getConnection((err, conn) => {
  if (err) throw err;
  conn.query("SELECT * FROM story", (error, results, fields) => {
    if(error) throw error;
    console.log(JSON.stringify(results, null, ' '));
    conn.release();
    pool.end();
  });
});
