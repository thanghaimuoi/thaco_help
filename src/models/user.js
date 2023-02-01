const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
                trim: true
            },
            loginTime: {
                type: Date,
                required: true
            },
            isActive: {
                type: Boolean,
                default: true
            }
        }
    ]
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const categoryObject = user.toObject();
    delete user.tokens;
    return categoryObject;
}

const User = mongoose.model('users', UserSchema)
module.exports = User