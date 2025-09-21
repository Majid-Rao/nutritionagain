// mailer.js
const { Resend } = require('resend');

// initialize Resend with API key (keep it in .env on Vercel)
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (senderEmail, recipientEmail, subject, messageContent) => {
  try {
    const response = await resend.emails.send({
      from: `website Consultation form <onboarding@resend.dev>`, // required verified sender domain or default Resend domain
      to: recipientEmail, // Admin email
      reply_to: senderEmail, // So admin can reply directly to sender
      subject: subject,
      html: `<p>${messageContent}</p>`, // use HTML (instead of plain text)
    });

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
