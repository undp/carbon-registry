var nodemailer = require("nodemailer");
var utilityIndex = require(".");
var configIndex = require("./../config");
const statusCodes = require('http-status-codes').StatusCodes;
exports.sendByGmail = function (to, subject, content) {
  var mailData = {
    to: to,
    subject: subject,
    content: content,
  };
  var errorObj = utilityIndex.factory.validationFactory(
    mailData,
    configIndex.constants.VALIDATE_NULL,
    "to",
    "subject",
    "content"
  );
  if (errorObj.hasError) {
    throw utilityIndex.factory.errorFactory(
      statusCodes.INTERNAL_SERVER_ERROR,
      configIndex.message.F_ERROR_PROCESS("email"),
      error
    );
  }
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.GMAIL_FROM, // sender address
    to: mailData.to.join(","), // list of receivers
    subject: mailData.subject,
    html: mailData.content, // plain text body
  };
  transporter
    .sendMail(mailOptions)
    .then((maildata) => {
      console.log("mail sent ", mailData.to.join(","),mailData.subject);
    })
    .catch((error) => {
      console.log("error in mail sent ", error);
      throw utilityIndex.factory.errorFactory(
        statusCodes.INTERNAL_SERVER_ERROR,
        configIndex.message.F_ERROR_PROCESS("mail"),
        error
      );
    });
};
