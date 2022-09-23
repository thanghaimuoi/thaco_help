const CategoryLogic = require('../logic/CategoryLogic');
const ContactLogic = require('../logic/ContactLogic');
const NewsLogic = require('../logic/NewsLogic');
const NotificationLogic = require('../logic/NotificationLogic');
const PictureLogic = require('../logic/PictureLogic');

const categoryLogic = new CategoryLogic();
const contactLogic = new ContactLogic();
const newsLogic = new NewsLogic();
const notificationLogic = new NotificationLogic();
const pictureLogic = new PictureLogic();


const pageInfoAssigment = async (req, res, next) => {
    try {
        let pageInfo = {};
        pageInfo.categories = await categoryLogic.getTreeCategory();
        pageInfo.contact = await contactLogic.getContact();
        pageInfo.notifications = await newsLogic.getNotification();
        pageInfo.news = await newsLogic.topNews(3);
        pageInfo.adPictures = await pictureLogic.getAdPicture();
        pageInfo.navLinks = [
            {
                name: "liên hệ",
                url: '/lien-he'
            },
            {
                name: "thư viện ảnh",
                url: '/thu-vien-anh'
            },
            {
                name: "thư viện video",
                url: '/thu-vien-video'
            }
        ];
        req.pageInfo = pageInfo;
        next()
    } catch (e) {
        res.status(500).send("lỗi :" + e.message)
    }
}

module.exports = pageInfoAssigment