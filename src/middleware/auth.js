const logger = require('../utils/logger').loginLogger;

const adminAuth = async (req, res, next) => {
    try {
        if (!req.headers.cookie) {
            logger.info('Đăng nhập admin : Không tìm thấy user');
            res.redirect(`/dang-nhap?returnUrl=${req.originalUrl}`);
            return;
        }
        try {
            if (req.session.user.email != "admin@vinahema.com.vn") {
                logger.info('Đăng nhập admin : Không phải là tài khoản admin');
                res.redirect("/dang-nhap");
                return;
            }
        } catch (error) {
            logger.info('Đăng nhập admin : ' + error);
            res.redirect(`/dang-nhap?returnUrl=${req.originalUrl}`);
            return;
        }
        next();
    } catch (e) {

        res.redirect("/dang-nhap");
    }
}

module.exports = adminAuth