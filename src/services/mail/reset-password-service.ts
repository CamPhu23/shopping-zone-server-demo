import nodemailer = require("nodemailer");
import ResetPasswordTemplate from '../../template/reset-password-mail';
import jwt from "jsonwebtoken";

const resetPasswordMail = async (email: string, payload: Object) => {
    // Create a link to reset password, expirein: 5m
    const token = jwt.sign(payload, process.env.JWT_RESET_PASSWORD_TOKEN_SECRET_KEY as string, {algorithm: "HS256", expiresIn: 60*5})
    // console.log(token)

    let url = process.env.ENVIRONMENT == 'development' ? process.env.REACT_APP_BASE_CLIENT_DEV : process.env.REACT_APP_BASE_CLIENT_PRO;
    const reset_password_url = url + "/reset-password/" + token;

    // create sending reset password link through email
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'shopping.zone.132@gmail.com', // generated ethereal user
          pass: 'xntrrfxxtsoibdys', // generated ethereal password xntrrfxxtsoibdys
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
    from: '"Shopping Zone" <shopping-zone@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Yêu cầu thay đổi mật khẩu", // Subject line
    html: ResetPasswordTemplate(reset_password_url),
    });
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default resetPasswordMail;