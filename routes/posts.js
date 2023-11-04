const express = require('express');
const router = express.Router();

const Post = require('../schemas/post');

// 전체 게시글 조회 API - 제목, 작성자, 작성일 조회하기, 작성 날짜를 기준으로 내림차순 정렬하기
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort('-date');
        res.json({ posts });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 게시글 작성 API - 제목, 작성자, 비밀번호, 내용을 입력학 게시글 작성하기
router.post('/', async (req, res) => {
    const { title, author, password, contents } = req.body;
    try {
        const post = await Post.create({ title, author, password, contents });
        res.json({ post });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// const posts = [
//     {
//         postsId: 1,
//         author: '작성자1',
//         createdat: '2021-01-01',
//         time: '2021-01-01',
//         title: '제목1',
//         content: '내용1',
//     },
//     {
//         postsId: 2,
//         author: '작성자2',
//         createdat: '2021-01-02',
//         time: '2021-01-02',
//         title: '제목2',
//         content: '내용2',
//     },
//     {
//         postsId: 3,
//         author: '작성자3',
//         createdat: '2021-01-03',
//         time: '2021-01-03',
//         title: '제목3',
//         content: '내용3',
//     },
// ];

// // 전체 게시글 조회
// router.get('/', (req, res) => {
//     res.json({ posts });
// });



// // 게시글 조회 API
// router.get('/:postsId', (req, res) => {
//     const { postsId } = req.params;
//     const post = posts.filter((post) => post.postsId == Number(postsId));
//     res.json({ post });
// });

module.exports = router;