const nodeMailer = require("nodemailer");

var sendEmail = async (options) =>{
    var transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            user : process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        }
    })
    //console.log(transporter)
    var mailOptions = {
        from:process.env.SMPT_MAIL,
        to: options.email,
        subject : options.subject,
        text: options.message
    };
     await transporter.sendMail(mailOptions)
    
}
module.exports = sendEmail;