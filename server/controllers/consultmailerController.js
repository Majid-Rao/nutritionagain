// controllers/contactController.js
const sendEmail = require('../utils/cmailer.js'); // Import the email sending function

// Controller function to handle form submission and email sending
const handleMailerForm = async (req, res) => {
  const { name, email } = req.body;

  // Validate the required fields
  if (!name || !email) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  // Prepare email details
  const senderEmail = email; // User's email from the form
  const recipientEmail = 'aishalakhwani10@gmail.com'; // Admin's hardcoded email
  const subject = 'Consultation Form Submission'; // Email subject
  const messageContent = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> Check Your Dashboard for more details.</p>

  `;

  try {
    // Send the email
    await sendEmail(senderEmail, recipientEmail, subject, messageContent);

    // Respond to client
    res.status(200).json({
      success: true,
      message: 'Form submitted successfully and email sent to admin!',
    });
  } catch (error) {
    console.error('Error in contact form controller:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
    });
  }
};

module.exports = { handleMailerForm };
