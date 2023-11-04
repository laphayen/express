const express = require('express');
const router = express.Router();

const Comment = require("../schemas/comment");

// 댓글 목록 조회 (GET /comments)
// 댓글 목록을 조회할 때는 댓글의 내용과 작성자 정보만 가져오고, 게시글 정보는 가져오지 않습니다.
router.get('/', async (req, res, next) => {
    try {
        const comments = await Comment.find({});
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 댓글 조회 (GET /comments/:id)
// 댓글 조회는 게시글 조회와 달리 특정 게시글에 속한 댓글만 조회하므로 게시글의 _id를 파라미터로 받아와서 조회합니다.
router.get('/:id', async (req, res, next) => {
    try {
        const comments = await Comment.find({ commenter: req.params.id }).populate('commenter');
        console.log(comments);
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 댓글 작성 (POST /comments)
// 댓글 작성은 댓글 내용과 댓글을 작성한 사용자의 정보를 함께 저장합니다.
router.post('/', async (req, res, next) => {
    try {
        const comment = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment,
        });
        console.log(comment);
        const result = await Comment.populate(comment, { path: 'commenter' });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 댓글 수정 (PATCH /comments/:id)
// 댓글 수정은 댓글의 _id를 받아서 내용을 수정합니다.
router.patch('/:id', async (req, res, next) => {
    try {
        const result = await Comment.update({ _id: req.params.id }, { comment: req.body.comment });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 댓글 삭제 (DELETE /comments/:id)
// 댓글 삭제는 댓글의 _id를 받아서 삭제합니다.
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await Comment.remove({ _id: req.params.id });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;