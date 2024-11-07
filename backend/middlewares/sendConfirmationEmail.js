const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendConfirmationEmail = async (req, res, next) => {
  const { email, name } = req.body; 
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER, 
    subject: "Registrazione completata con successo",
    text: `Ciao ${name},\n\nLa tua registrazione è stata completata con successo! Grazie per esserti registrato.`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email di conferma inviata con successo.");
    next();
  } catch (error) {
    console.error("Errore nell'invio dell'email:", error);
    next(error); 
  }
};

module.exports = sendConfirmationEmail;
