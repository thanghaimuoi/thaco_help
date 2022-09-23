const AbsLogic = require('./AbsLogic');
const Category = require('../models/category');

class CategoryLogic extends AbsLogic {
    constructor() {
        super(Category);
    }

    getChilds = async function(parentId = null) {
        if (!parentId) {
            return await Category.find({parentCategory: null});
        }
        let childs = await Category.find({parentCategory: parentId});
        return childs;
    }

    getRoot = async function() {
        return await Category.findOne({parentCategory: null});
    }

    delete = async function(id) {
        await Category.deleteMany({parentCategory: id});
        await Category.deleteOne({_id : id});
    }

    getFileContent = async function(id) {
        let content = await Category.find({_id : id}, {document : 1});
        if (content && content.length > 0) {
            return !content[0].document ? '' : content[0].document;
        }
        return '';
    }
}

module.exports = new CategoryLogic();