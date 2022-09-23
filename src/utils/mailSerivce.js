const ContactLogic = require('../logic/ContactLogic');
const contactLogic = new ContactLogic();
const contact = contactLogic.getContact();
const nodemailer = require('nodemailer');

const mailConfigure = {
    fromMail : "vinahemacomvn@gmail.com",
    password: "vanbinhpvb91@live.com",
    service: "gmail"
}

const transport = nodemailer.createTransport({
    service: mailConfigure.service,
    auth: {
        user: mailConfigure.fromMail,
        pass: mailConfigure.password
    }
})

const MailUtil = {
    createMailOption : function(mailInfo) {
        mailOption = {
            from: mailConfigure.from,
            to: mailInfo.to,
            subject: mailInfo.subject,
            text: mailInfo.text,
            html: mailInfo.html
        };
        return mailOption;
    },
    sendMail: async function (mailInfo) {
        let mailOption = this.createMailOption(mailInfo);
        await transport.sendMail(mailOption);
    }
}

module.exports = MailUtil;
