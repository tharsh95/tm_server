"use strict";
// import { createTransport } from "nodemailer"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = sendOtpEmail;
// const transporter = createTransport(
//     {
//         secure: true,
//         host: 'smtp.gmail.com',
//         port: 465,
//         auth: {
//             user: "harsh.tiwari1995@gmail.com",
//             pass: "hjnmplkjhawcvdqq"
//         }
//     }
// )
// interface MailOptions {
//     to: string;
//     subject: string;
//     html: string;
// }
// export const mail = (to: string, sub: string, html: string): void => {
//     const mailOptions: MailOptions = {
//         to,
//         subject: sub,
//         html: html
//     };
//     transporter.sendMail(mailOptions);
// }
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendOtpEmail(to, msg) {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail', // or any email provider
        auth: {
            user: 'harsh.tiwari1995@gmail.com',
            pass: 'hjnmplkjhawcvdqq',
        },
    });
    const emailHtml = `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #4caf50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      color: #333333;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #4caf50;
      text-align: center;
      margin: 20px 0;
    }
    .email-footer {
      text-align: center;
      padding: 15px;
      background-color: #f4f4f4;
      font-size: 14px;
      color: #777777;
    }
    .email-footer a {
      color: #4caf50;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="email-header">
      <h1>OTP Verification</h1>
    </div>
    <!-- Body -->
    <div class="email-body">
      <p>Hello,</p>
      <p>We received a request to verify your email address. Please use the following One-Time Password (OTP) to complete the process:</p>
      <div class="otp">{{OTP}}</div>
      <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
      <p>If you did not request this verification, please ignore this email or contact our support team.</p>
      <p>Thank you,</p>
      <p>The {{APP_NAME}} Team</p>
    </div>
  </div>
</body>
</html>
`.replace('{{OTP}}', msg)
        .replace('{{APP_NAME}}', 'Task Management')
        .replace('{{SUPPORT_LINK}}', 'https://yourapp.com/support');
    const mailOptions = {
        from: '"YourAppName" <your-email@example.com>',
        to: to,
        subject: 'Your OTP Code',
        html: emailHtml,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully.');
    }
    catch (error) {
        console.error('Error sending OTP email:', error);
    }
}
