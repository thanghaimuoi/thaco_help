const express = require('express');
const CategoryLogic = require('../logic/CategoryLogic');
const router = new express.Router();

router.get('/api/category/root', async (req, res) => {
    let root = await CategoryLogic.getRoot();
    res.send(root);
});

router.get('/api/category/childs', async (req, res) => {
    let parentId = !req.query.parentId ? null : req.query.parentId;
    let tree = await CategoryLogic.getChilds(parentId);
    res.send(tree);
});

router.put('/api/admin/category/add', async (req, res) => {
    let newCateogry = await CategoryLogic.insert(req.body);
    let tree = await CategoryLogic.getTree();
    res.send(tree);
});

router.post('/api/admin/category/update', async (req, res) => {
    let updateData = await CategoryLogic.update(req.body);
    let tree = await CategoryLogic.getTree();
    res.send(tree);
});

router.delete('/api/admin/category/delete/:id', async (req, res) => {
    await CategoryLogic.delete(req.params.id);
    let tree = await CategoryLogic.getTree();
    res.send(tree);
});

router.get('/api/category/file-content/:id', async (req, res) => {
    let fileContent = await CategoryLogic.getFileContent(req.params.id);
    res.send(fileContent);
});

router.get('/api/category/tree', async (req, res) => {
    let tree = await CategoryLogic.getTree();
    res.send(tree);
});

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.post('/upload', multipartMiddleware, function(req, res) {
    var fs = require('fs');

    fs.readFile(req.files.upload.path, function (err, data) {
        var newPath = __dirname + '/../../public/uploads/' + req.files.upload.name;
        fs.writeFile(newPath, data, function (err) {
            if (err) console.log({err: err});
            else {
                res.send({
                    uploaded: true,
                    url : "http://localhost:4000/uploads/" + req.files.upload.name
                });
            }
        });
    });
});

module.exports = router;