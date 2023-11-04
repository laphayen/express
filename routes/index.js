const express = require('express');
const router = express.Router();
const User = require('../schemas/user');

// 루트 경로
router.get('/', (req, res) => {
    res.send("Hello, Express!🌊");
});

// 계정 생성
router.get('/create', async (req, res, next) => {
    const { id, email, password, confirmPassword } = req.query;

    // id 중복 확인
    const existUsers = await User.find({ id });
    if (existUsers.length) {
        return res.status(409).send("이미 존재하는 ID입니다.");
    }

    // password 일치 확인
    if (password !== confirmPassword) {
        return res.status(409).send("비밀번호가 일치하지 않습니다.");
    }

    // 계정 생성
    const user = new User({ id, email, password });
    await user.save();

    return res.status(201).send("계정이 생성되었습니다.");
});


module.exports = router;