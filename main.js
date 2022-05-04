const express = require('express')
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express()
const port = 3000


const sb = require('./public/js/db');
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/email', (req, res) => {
    res.render('email');
})
app.post('/email', (req, res) => {
    const post = req.body;
    console.log(post);
    const sql = 'INSERT INTO EMAIL_TB (EMAIL_EMAIL, EMAIL_CREATE, EMAIL_WHERE) VALUES';
    const sqlValue = `("${post.email}",NOW(),1);`; // EMAIL_WHERE=1 -> 소마 이메일 수집

    if(!post.email){
        res.send("<script>alert('이메일을 입력해주세요.');location.href='/email';</script>");
    }
    else{
        sb.query(sql+sqlValue,function(err,result,fields){
  
          if (err){
              res.send("<script>alert('이메일 입력에 오류가 발생했습니다.');location.href='/email';</script>");
              throw err;
          }
          else{
            res.send("<script>alert('예약되었습니다. 출시되면 알려드릴게요!');location.href='/email';</script>");
          }
        });
      }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})