const express = require('express')
const ejs = require('ejs');
const bodyParser = require('body-parser');
const logger = require('./public/js/logger');
const app = express()
const port = 3000


const sb = require('./public/js/db');
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    logger.log('error','사용자가 root에 접근');
    res.render('index');
})

app.get('/email', (req, res) => {
    logger.log('info','사용자가 /email에 접근');
    res.render('email');
})
app.post('/email', (req, res) => {
    const post = req.body;
    console.log(post);
    const sql = 'INSERT INTO EMAIL_TB (EMAIL_EMAIL, EMAIL_CREATE, EMAIL_WHERE) VALUES';
    const sqlValue = `("${post.email}",NOW(),1);`; // EMAIL_WHERE=1 -> 소마 이메일 수집
    logger.log('info', '사용자가 /email에서 post');
    if (!post.email) {
        res.send("<script>alert('이메일을 입력해주세요.');location.href='/email';</script>");
    } else {
        sb.query(sql + sqlValue, function (err, result, fields) {

            if (err) {
                logger.log('error', '이메일 입력에서 오류발생');
                res.send(
                    "<script>alert('이메일 입력에 오류가 발생했습니다.');location.href='/email';</script>"
                );

                throw err;
            } else {
                logger.log('info', '사용자가 이메일을 입력하였습니다.');
                res.send(
                    "<script>alert('예약되었습니다. 출시되면 알려드릴게요!');location.href='/email';</script>"
                );
            }
        });
    }
})

app.listen(port, () => {
    logger.log('info', '서버 오픈'+`${port}`);
    console.log(`Example app listening on port ${port}`);
})