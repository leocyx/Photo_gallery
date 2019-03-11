var express = require('express');
var multer = require('multer')
const path = require('path')
var bodyParser = require('body-parser');
const mongo = require("./mongo.js");
var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/upload_img', (req, res) => {
    res.sendFile(__dirname + '/upload.html')
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({ storage: storage })

app.post("/upload", upload.array("file", 20), function (req, res) {
    console.log(req.body)
    mongo.insert(req.files, req.body.comment)
    res.send({
        type: 200
    })
})

app.post("/display", function (req, res) {
    mongo.find(function (items) {
        //console.log(items);
        res.send(items)
    })

})



mongo.open()
app.listen(3000, console.log("連線成功"));