const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(port, '포트로 서버 열림');
});

const goodsRouter = require("./routes/goods");

// localhost:3000/api -> goodsRouter
app.use("/api", [goodsRouter]);