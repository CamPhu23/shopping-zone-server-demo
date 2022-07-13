import { dateFormatter } from '../converter/date-formatter'
import { currencyFomatter } from '../converter/currency-formatter';
import { colorConverter } from '../utils/color-converter';

const ReceiptTemplate = (receipt: any) => {
    let product_table = ``;
    let products: Array<object> = receipt.products;
    const dateOrder = dateFormatter(receipt.createdAt);

    products.forEach((p:any) => {
        product_table += `
            <tr>
                <td style="text-align:left;">${p.name} (${colorConverter(p.color)}, ${p.size})</td>
                <td style="text-align:center;">${p.quantity}</td>
                <td style="text-align:right;">${currencyFomatter(p.price)}</td>
            </tr>`    
    });

    return (
        `
        <!doctype html>
        <html lang="en-US">

        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title></title>
            <meta name="description" content="Reset Password Email Template.">
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="robots" content="noindex,nofollow" />
            <meta name="viewport" content="width=device-width; initial-scale=1.0;" />
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
                table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }
                
                td, th {
                    border: 0px solid #dddddd;
                    padding: 8px;
                }
                .totalBill {
                    font-weight: bold;
                    color: green;
                    font-size:20px;
                }
                .infor-client-title{
                    font-weight: bold;
                    text-align: left;
                }
                .infor-client{
                    text-align: left;
                }
                .title{
                    font-size:25px;
                    margin-top:15px;
                    margin-bottom:15px;
                }
                .client-table, .product-table, .money-table{
                    font-size:20px;
                }
            </style>

        </head>

        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                <a href="https://rakeshmandal.com" title="logo" target="_blank">
                                    <img style="border-radius: 50%" width="150" src="https://res.cloudinary.com/dazdxrnam/image/upload/v1657711523/ShoppingZone/Logo_kum5un.jpg" title="logo" alt="logo">
                                </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="align:center">SHOPPING ZONE</h1>
                                                <h2 style="color:#1e1e2d; font-weight:500; margin:0;font-size:24px; align:center; font-family:'Rubik',sans-serif;">Cảm ơn bạn đã đặt hàng tại Shopping Zone!</h2>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:15px 0 15px 0; border-bottom:1px solid #cecece; width:220px;">
                                                </span>
                                                <br>
                                                

                                                <!-- information shiping -->
                                                <h3 class="title">Thông tin người nhận hàng</h3>
                                                <table class="client-table">
                                                    <tr>
                                                        <td class="infor-client-title">Họ và tên:</td>
                                                        <td class="infor-client">${receipt.fullname}</td>
                                                    </tr> 
                                                    <tr>
                                                        <td class="infor-client-title">Số điện thoại: </td>
                                                        <td class="infor-client">${receipt.phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="infor-client-title">Hình thức thanh toán: </td>
                                                        <td class="infor-client">${receipt.paymentMethod == "COD" ? receipt.paymentMethod : "Thẻ tín dụng"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="infor-client-title">Ngày đặt hàng: </td>
                                                        <td class="infor-client">${dateOrder}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="infor-client-title">Địa chỉ nhận hàng: </td>
                                                        <td class="infor-client">${receipt.address}</td>
                                                    </tr>
                                                </table>

                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:15px 0 15px 0; border-bottom:1px solid #cecece; width:220px;">
                                                </span>
                                                <br>

                                                <!-- detail receipt-->
                                                <h3 class="title">Chi tiết đơn hàng</h3>
                                                <table class="product-table">
                                                    <tr style="text-align:left;">
                                                        <th>Sản phẩm</th>
                                                        <th style="text-align:center;">Số lượng</th>
                                                        <th style="text-align:right;">Giá tiền</th>
                                                    </tr> 
                                                ` + product_table + `</table>`+
                                                `
                                                <table class="money-table">
                                                    <tr class="totalPay">
                                                        <td></td>
                                                        <td style="text-align:right; font-weight: bold;">Tổng tiền hàng:</td>
                                                        <td style="text-align:right;">${currencyFomatter(receipt.totalPay)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td style="text-align:right; font-weight: bold;">Phí vận chuyển:</td>
                                                        <td style="text-align:right;">${currencyFomatter(receipt.shippingCost)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td style="text-align:right; font-weight: bold;">Giảm giá:</td>
                                                        <td style="text-align:right;">${currencyFomatter(receipt.totalDiscount)}</td>
                                                    </tr>
                                                    <tr class="totalBill">
                                                        <td></td>
                                                        <td style="text-align:right; font-weight: bold;">Thành tiền:</td>
                                                        <td style="text-align:right;">${currencyFomatter(receipt.totalBill)}</td>
                                                    </tr>
                                                </table>

                                                <p style="padding: 8px; font-size:20px;line-height:24px; margin:0; margin-top:25px; text-align:justify;">
                                                    Trân trọng, <br> Shopping Zone.
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                        
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->

            <script src="index.js"> 

            </script>
        </body>

        </html>
    `)
}

export default ReceiptTemplate