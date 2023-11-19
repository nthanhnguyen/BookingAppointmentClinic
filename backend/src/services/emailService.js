require('dotenv').config();
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
  if(dataSend.language === 'vi'){
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
  if (dataSend.language === 'en'){
    result = `<h3> HeLLo ${dataSend.patientName}! </h3>
    <p> You received this email because you made an online medical appointment on Care4u</p>
    <p> Information on ordering medical examination:</p>
    <div><b>Time ${dataSend.time}</b></div>
    <div><b>Doctor${dataSend.doctorName}</b></div>

    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
    <div> 
      <a href =${dataSend.redirectLink} target = "_blank">Click here</a>
    </div>

    <div> Xin chân thành cảm ơn </div>
    ` // html body`
  }
  return result;
}

module.exports = {
    sendSimpleEmail : sendSimpleEmail,
}