const UserLogic = require('../logic/UserLogic');

const authorizationConfigure = {
    allowAll: ["/api/login", "/upload", "/uploads"],
    admin: ["/api/admin*"]
};

const allowStatic = ['jpg', 'jpge', 'json', 'js', 'css', 'ico', 'html']

const checkInList = (path, listPath) => {
    for (const static of allowStatic) {
        if (path.endsWith('.' + static)) {
            return true;
        }
    }
    for (let cpath of listPath) {
        if (cpath.endsWith("*")) {
            return path.startsWith(cpath.replace("*", ""));
        } if (cpath.startsWith("*")) {
            return path.endsWith(cpath.replace("*", ""));
        } else {
            if (path == cpath) {
                return true;
            }
        }
    }
    return false;
}

const auth = async (req, res, next) => {
    try {
        if (checkInList(req.originalUrl, authorizationConfigure.allowAll)) {
            next();
            return;
        }
        
        let token = !req.header('Authorization')? null : req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            token = req.cookies['token'];
        }
        const user = await UserLogic.findByToken(token);
        if (!user) {
            res.status(401).send({message: "Vui lòng đăng nhập"});
            return;
        }
        if (!user.isAdmin && checkInList(req.originalUrl, authorizationConfigure.admin)) {
            res.status(401).send({message: "Bạn không có quyền truy cập"});
            return;
        }

        req.token = token;
        req.user = user;
        next();
    } catch (ex) {
        res.status(401).send({message: "Không tìm thấy token"});
    }
}

module.exports = auth