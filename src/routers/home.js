const express = require('express');
const router = new express.Router();

router.get('', async (req, res) => {
    res.render('index', {
    });
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Không tìm thấy',
        pageInfo: req.pageInfo,
        user: req.session.user,
        errorMessage: 'Trang không tồn tại.'
    })
});

module.exports = router;