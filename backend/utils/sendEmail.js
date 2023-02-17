const nodeMailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');


const sendEmail = async (options)=>{
    sgMail.setApiKey("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")
    // const transporter = nodeMailer.createTransport({
    //     service:process.env.SMPT_SERVICE,
    //     auth:{
    //         user: process.env.SMPT_MAIL,
    //         pass: process.env.SMPT_PASSWORD
    //     },
    // });
    // const mailOptions = {
    //     form:process.env.SMPT_MAIL,
    //     to:options.email,
    //     subject:options.subject,
    //     text:options.message
    // };
    const msg = {
        to: options.email, // Change to your recipient
        from: process.env.SMPT_MAIL, // Change to your verified sender
        subject: options.subject,
        html: options.message,
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })

    

};
module.exports = sendEmail
