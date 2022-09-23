const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: false
    },
    isFile: {
        type: Boolean,
        default: false
    },
    document: {
        type: String,
        required: false
    }
});

CategorySchema.methods.toJSON = function () {
    const category = this;
    const categoryObject = category.toObject();
    delete categoryObject.document;
    return categoryObject;
}

const Category = mongoose.model('categories', CategorySchema)
module.exports = Category