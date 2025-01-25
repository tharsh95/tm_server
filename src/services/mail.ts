import { createTransport } from "nodemailer"

const transporter = createTransport(
    {
        secure: true,
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: "harsh.tiwari1995@gmail.com",
            pass: "hjnmplkjhawcvdqq"
        }
    }
)


interface MailOptions {
    to: string;
    subject: string;
    html: string;
}

export const mail = (to: string, sub: string, msg: string): void => {
    const mailOptions: MailOptions = {
        to,
        subject: sub,
        html: msg
    };

    transporter.sendMail(mailOptions);
}