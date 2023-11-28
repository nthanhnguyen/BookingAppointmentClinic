require('dotenv').config();
const { reject } = require('lodash');
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Care4u" <chauquocthai10@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám", // Subject line
    html: getBodyHTMLEmail(dataSend),

  });

}
let getBodyHTMLEmail = (dataSend) => {
  let result = ''
  if (dataSend.language === 'vi') {
    result = `<h3> Xin Chào ${dataSend.patientName}! </h3>
    <p> Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Care4u</p>
    <p> Thông tin đặt lệnh khám bệnh:</p>
    <div><b>Thời gian ${dataSend.time}</b></div>
    <div><b>Bác Sĩ ${dataSend.doctorName}</b></div>

    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
    <div> 
      <a href =${dataSend.redirectLink} target = "_blank">Click here</a>
    </div>

    <div> Xin chân thành cảm ơn </div>
    ` // html body`
  }
  if (dataSend.language === 'en') {
    result = `<h3> HeLLo ${dataSend.patientName}! </h3>
    <p> You received this email because you made an online medical appointment on Care4u</p>
    <p> Information on ordering medical examination:</p>
    <div><b>Time ${dataSend.time}</b></div>
    <div><b>Doctor${dataSend.doctorName}</b></div>

    <p> If the above information is true, please click on the link below to confirm and complete the medical appointment procedure.</p>
    <div> 
      <a href =${dataSend.redirectLink} target = "_blank">Click here</a>
    </div>

    <div> Sincerely thank </div>
    ` // html body`
  }
  return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = ''
  if (dataSend.language === 'vi') {
    result = `<h3> Xin Chào ${dataSend.patientName}! </h3>
    <p> Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Care4u thành công</p>
    <p> Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm</p>
    
    <div> Xin chân thành cảm ơn </div>
    ` // html body`
  }
  if (dataSend.language === 'en') {
    result = `<h3> Deat ${dataSend.patientName}! </h3>
    <p> You received this email because you made an online medical appointment on Care4u</p>
    <p>bla bla</p>
    <div> Sincerely thank </div>
    ` // html body`
  }
  return result;

}

let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {


      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD
        }
      });

      // async..await is not allowed in global scope, must use a wrapper

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Care4u" <chauquocthai10@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
          {
            filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: 'base64'
          }
        ],
      });
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment
}