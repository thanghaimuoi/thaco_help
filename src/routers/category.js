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

router.put('/api/category/add', async (req, res) => {
    let newCateogry = await CategoryLogic.insert(req.body);
    res.send(newCateogry);
});

router.post('/api/category/update', async (req, res) => {
    let updateData = await CategoryLogic.update(req.body);
    res.send(updateData);
});

router.delete('/api/category/delete/:id', async (req, res) => {
    await CategoryLogic.delete(req.params.id);
    res.send('');
});

router.get('/api/category/file-content/:id', async (req, res) => {
    let fileContent = await CategoryLogic.getFileContent(req.params.id);
    res.send(fileContent);
});

module.exports = router;