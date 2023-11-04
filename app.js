// Express 모듈을 실행해서 app 변수에 할당 - 내부에 http 모듈 내장
const express = require("express");

const app = express();

// 서버가 실행될 포트 설정해줍니다.
// process.env 객체에 PORT 속성이 있을 경우 사용합니다.
app.set('port', process.env.PORT || 3000);

// HTTP요청의 JSON 데이터 파싱하기 위한 미들웨어 설정합니다.
// 요청 본문에 있는 JSON 데이터 파싱하고 파싱된 데이터를 요청 객체의 req.boy 속성에 사용할 수 있도록
// -> POST, PUT 매서드를 사용해서 JSON 데이터 처리
app.use(express.json());

// 몽고디비 연결
const connect = require('./schemas');
connect();

// 라우터 연결
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);


// 포트를 열결하고 서버를 실행 - app.get('port')로 포트를 가져옵니다.
app.listen(app.get('port'), () => {
    console.log("서버가 켜졌습니다!!");
    console.log("포트 번호:", app.get('port'));
});