// mailer.js
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail as an example
  auth: {
    user: 'aishalakhwani10@gmail.com', // Your email
    pass: 'awpo rxff jntv hipc', // Your email password or app password
  },
});

const sendEmail = (senderEmail, recipientEmail, subject, messageContent) => {
  const mailOptions = {
       from: senderEmail,  // Sender's email is dynamic (from the form submission)
    to: recipientEmail, // Recipient is hardcoded (admin's email)
    subject: subject,   // Email subject
    text: messageContent, // Email body content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error.message);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
