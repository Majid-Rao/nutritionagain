// controllers/contactController.js

const sendEmail = require('../utils/mailer.js'); // Import the email sending function

// Controller function to handle form submission and email sending
const handleContactForm = (req, res) => {
  const { name, email, message } = req.body;

  // Validate the required fields (optional, based on your needs)
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  // The sender email is dynamic (the email submitted from the form)
  const senderEmail = email; // User's email from the form
  const recipientEmail = 'aishalakhwani10@gmail.com'; // Admin's hardcoded email
  const subject = 'New Form Submission'; // You can customize the subject
  const messageContent = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`; // The body of the email

  // Send the email
  sendEmail(senderEmail, recipientEmail, subject, messageContent);

  // Send a response back to the client
  res.status(200).json({ message: 'Form submitted successfully and email sent to admin!' });
};

module.exports = { handleContactForm };
