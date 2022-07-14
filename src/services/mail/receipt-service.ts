import nodemailer = require("nodemailer");
import ReceiptTemplate from "../../template/receipt-mail";

const receiptMail = async (newReceipt: Object, email: string) => {
    let url = process.env.ENVIRONMENT == 'development' ? process.env.REACT_APP_BASE_CLIENT_DEV : process.env.REACT_APP_BASE_CLIENT_PRO;
    const login_url = url + "/login/" ;
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
        from: '"Shopping Zone" <shopping-zone@gmail.com>',
        to: `${email}`,
        subject: "Shopping Zone: Thông tin hóa đơn mua hàng",
        html: ReceiptTemplate(newReceipt),
    });
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default receiptMail;