import Express from 'express';
import cors from 'cors';

const app = Express();
const port = 3000;

/** 
 *  all request use cors
 */
// app.use(cors());

// app.get('/products/:id', (req, res, next) => {
//     res.json({
//         msg: 'This is CORS-enable for all origins!'
//     });
// });

/** 
 * sigle request use cors
 */
// app.get('/products/:id', cors(), (req, res, next) => {
//     res.json({
//         msg: 'This is CORS-enable for  a Signle Route!'
//     });
// });

/**
 * configuring CORS
 */
// const corsOptions = {
//     origin: 'http://expressjs.com',
//     optionsSuccessStatus: 200,
// };

// app.get('/products/:id', cors(corsOptions), (req, res, next) => {
//     res.json({
//         msg: 'This is CORS-enable for only expressjs.com!'
//     });
// });

/**
 * configuring CORS Dynamic Origin
 */
// const whitelist = ['https://www.baidu.com', 'http://expressjs.com'];
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
// };

// app.get('/products/:id', cors(corsOptions), (req, res, next) => {
//     res.json({
//         msg: 'This is CORS-enabled for a whitelisted domain.'
//     });
// });

/** 
 * configuring CORS Asyncchronously
 */

app.listen(port, () => {
    console.log(`Started on prot ${port}`);
});

const whitelist = ['https://www.baidu.com', 'http://expressjs.com'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

app.get('/products/:id', cors(corsOptionsDelegate), (req, res, next) => {
    res.json({
        msg: 'This is CORS-enabled for a whitelisted domain.'
    });
});