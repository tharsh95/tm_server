"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = void 0;
const nodemailer_1 = require("nodemailer");
const transporter = (0, nodemailer_1.createTransport)({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: "harsh.tiwari1995@gmail.com",
        pass: "hjnmplkjhawcvdqq"
    }
});
const mail = (to, sub, msg) => {
    const mailOptions = {
        to,
        subject: sub,
        html: msg
    };
    transporter.sendMail(mailOptions);
};
exports.mail = mail;
