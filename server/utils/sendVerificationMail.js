const { createMailTranspoter } = require("./createMailTranspoter");

const sendVerificationMail = (user) => {
  const transporter = createMailTranspoter();

  const mailOptions = {
    from: '"Company App" <nagarajbiradar2024@outlook.com> ',
    to: user.email,
    subject: "Verify your email...",
    html: `<p>Hello ${user.name}, verify your email by clicking this link...  </p>
            <a href='${process.env.CLIENT_URL}/verify-email?emailToken=${user.emailToken}'>Verify Your Email </a>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification mail sent.");
    }
  });
};

module.exports = { sendVerificationMail };
