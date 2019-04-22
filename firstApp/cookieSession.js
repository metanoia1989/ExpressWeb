import Express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import config from './config.js';


const app = Express();
const port = process.env.PORT || config.port;

app.use(cookieParser(config.cookieSecret));
app.use(cookieSession({
    name: config.sessionName,
    secret: config.cookieSecret,
    maxAge: config.cookieExpire,
    signed: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    let i = req.session.views || 0;
    req.session.views = ++i;
    console.log(i, req.session.views);
    next();
});

app.get('/', (req, res) => {
    res.send('hello  asdfsad  world');
});


// cookie 使用示例
app.post('/cookie', (req, res) => {
    const { key, value, expire = config.cookieExpire } = req.body;
    if(key && value) {
        res.cookie(key, value, { signed: true, maxAge: expire });
    }
    res.send(`设置cookie ${key}: ${value} 成功`);  
});

app.get('/cookies', (req, res) => {
    res.json({
      Cookies: req.cookies,
      SignedCookies: req.signedCookies,
    });
});

// session 使用示例
app.get('/session', (req, res) => {
    res.send('session.views: ' + req.session.views || 0);
});


app.listen(port, () => {
    console.log(`Started on prot ${port}`);
});