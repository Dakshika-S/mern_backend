const nodeemailer = require("nodemailer");

const sendEmail = async (Options) => {
  const transport = {
    ///to store info
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  const transporter = nodeemailer.createTransport(transport);

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: Options.email,
    subject: Options.subject,
    text: Options.message,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
