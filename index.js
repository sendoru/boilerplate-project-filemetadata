const express = require('express');
const cors = require('cors');
const multer = require('multer');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser')
require('dotenv').config();

const options = {
  key: fs.readFileSync('./rootca.key'),
  cert: fs.readFileSync('./rootca.crt')
};

var app = express();

const upload = multer({ dest: 'uploads/' })
app.use(bodyParser.urlencoded({
   extended: false
}));


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  res.json({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  })
})

https.createServer(options, app).listen(3000);