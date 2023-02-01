const AbsLogic = require('./AbsLogic');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

class UserLogic extends AbsLogic {
    constructor() {
        super(User);
    }

    login = async function(name) {
        let user = await User.findOne({name});
        if (!user) {
            user = {
                name,
                isAdmin: false,
                tokens: []
            }
            user = await this.insert(user);
        }
        const token = jwt.sign({ name }, process.env.SECURITY_CODE);
        let newToken = {
            token,
            loginTime: new Date(),
            isActive: true
        };
        user.tokens = [newToken];
        await user.save();
        return token;
    }

    findByToken = async (token) => {
        let user = await User.findOne({tokens: {$elemMatch:{token}}});
        return user;
    }
}

module.exports = new UserLogic();