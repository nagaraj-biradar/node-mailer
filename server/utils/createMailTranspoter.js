const nodemailer = require("nodemailer");

const createMailTranspoter = () => {
  const transpoter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER_NAME,
      pass: process.env.PASSWORD,
    },
  });

  return transpoter;
};

module.exports = { createMailTranspoter };
