const express = require('express')
const multer  = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'uploads/' })
const path = require('path')

const app = express()

app.use(cors()) // 允许跨域

// 这里的 'file' 与 form.html 里的 'file' 对应
app.post('/upload',  upload.single('uploadFile'), function (req, res, next) {

    res.end(req.file.filename)
})


app.get('/download/:name', function (req, res, next) {
    console.log(`服务器响应 download 时间：第${new Date().getMilliseconds()}毫秒`);
    var options = {
        root: path.join(__dirname, 'uploads'),
        headers: {
            'Content-Type': 'image/jpeg',
        }
    }

    var fileName = req.params.name
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', fileName)
        }
    })
})

// 从运行环境中获取端口号，PORT=5000 node index.js 则端口号为5000
let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})