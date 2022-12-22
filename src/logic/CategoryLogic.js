const AbsLogic = require('./AbsLogic');
const Category = require('../models/category');

class CategoryLogic extends AbsLogic {
    constructor() {
        super(Category);
    }

    getTree = async function(node = null) {
        if (node == null) {
            node = await Category.findOne({parentCategory: null});
        }
        node = node.toJSON();
        const childs = await Category.find({parentCategory: node._id});
        let nodeChilds = [];
        for (const child of childs) {
            let addChild = await this.getTree(child);
            nodeChilds.push(addChild);
        }
        node.childs = nodeChilds;
        return node;
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