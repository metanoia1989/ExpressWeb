import Express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = Express();
const port = 3000;

// 文件上传初始化参数
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = (file.originalname).split('.').pop();
    const filename = file.fieldname + '-' + Date.now() + "." + ext;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = (file.originalname).split('.').pop();
  const allowExt = ['jpg', 'jpeg', 'png', 'gif'];
  const allowMime = ['image/jpeg', 'image/png', 'image/gif'];
  if(allowExt.indexOf(ext) === -1 || allowMime.indexOf(file.mimetype) === -1) {
    cb(null, false);
    cb(new Error('文件类型错误'));
  } else {
    cb(null, true);
  }
};

const limits = {
  fileSize: 0.3 * 1024 * 1024,
};

const upload = multer({ 
  storage,
  fileFilter, 
  limits,
}).single('file');

// 手动封装文件上传中间件 带错误处理
const uploadMiddleware = (req, res, next) => {
  upload(req, res, err => {
    if (err) res.json({ code: -1, msg: err.toString() });
    else next();
  });
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 单个文件上传
app.post('/upload', uploadMiddleware, (req, res) => {
  if(!req.file) {
    res.json({
      msg: '上传失败',
      post: req.body,
    });
  } else {
    res.json({
      msg: '上传成功',
      file: req.file,
      post: req.body,
    });
  }
});



app.listen(port, () => {
    console.log(`Started on prot ${port}`);
});