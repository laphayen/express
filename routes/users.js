
const express = require('express');
const router = express.Router();
const User = require('../schemas/user');

const authMiddleware = require('../middlewares/auth-middleware');

// 회원가입 API
router.post('/', async (req, res) => {
    const { email, nickname, password, confirmPassword } = req.body;

    // 이메일 형식 확인 정규식
    if (nickname.length < 3) {
        res.status(400).json({
            errorMessage: '닉네임은 3 이상으로 입력해주세요.',
        });
        return;
    }

    // 이메일 알파벳, 숫자, 특수문자 확인 정규식
    const nicknameRegex = /^[a-z0-9]+$/;
    if (!nicknameRegex.test(nickname)) {
        res.status(400).json({
            errorMessage: '닉네임은 알파벳 소문자와 숫자만 사용할 수 있습니다.',
        });
        return;
    }

    // 비밀번호 확인 정규식
    if (password.length < 4) {
        res.status(400).json({
            errorMessage: '비밀번호는 4자 이상으로 입력해주세요.',
        });
        return;
    }

    // 비밀번호 확인 정규식
    // 비밀번호에 닉네임 포함 확인 정규식과 패스워드 확인란과 일치하는지 확인
    if (password.includes(nickname) || password !== confirmPassword) {
        res.status(400).json({
            errorMessage: '비밀번호에 닉네임을 포함할 수 없습니다.',
        });
        return;
    }

    // email 또는 nickname이 동일한 데이터가 있는지 확인하기 위해 가져온다.
    const existsUsers = await User.findOne({
        $or: [{ email }, { nickname }],
    });

    if (existsUsers) {
        // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않습니다.
        res.status(400).json({
            errorMessage: '이메일 또는 닉네임이 이미 사용중입니다.',
        });
        return;
    }

    const user = new User({ email, nickname, password });
    await user.save();

    res.status(201).json({});
});

module.exports = router;