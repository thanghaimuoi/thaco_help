const express = require('express');
const router = new express.Router();
const nodemailer = require('nodemailer');
const UserLogic = require('../logic/UserLogic');
const executeRoute = require('../utils/executeRoute');

/**
 * Lấy toàn bộ danh sách người dùng và đại lý
 * tham số user : email
 * tham số pass : mật khẩu
 */
router.post('/api/login', async(req, res) => {
    executeRoute(req, res, async (req, res) => {
        let transporter = nodemailer.createTransport({
            host: 'mail.thaco.com.vn',
            port: 587,
            auth: req.body
        })
        let success = false;
        try {
            // đăng nhập thành công
            let rs = await transporter.verify();
            let token = await UserLogic.login(req.body.user);
            res.cookie('token', token, { maxAge: 9000000, httpOnly: true });
            success = true;
            let user = await UserLogic.findByToken(token);
            return {success, user};
        } catch (ex) {
            // đăng nhập thất bại
            return {success};
        }
    });
});

router.get('/api/user', async(req, res) => {
    executeRoute(req, res, async(req, res) => {
        if (!req.user) {
            throw new EvalError();
        }
        return req.user;
    });
})

module.exports = router;