const nodeMailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');


const sendEmail = async (options)=>{
    sgMail.setApiKey("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")

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
