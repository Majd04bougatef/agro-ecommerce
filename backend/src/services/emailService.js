const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderConfirmation = async (toEmail, orderId) => {
  const mailOptions = {
    from: `"Agro E-Commerce" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Confirmation de commande #${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">Merci pour votre commande !</h2>
        <p>Votre commande <strong>#${orderId}</strong> a été confirmée avec succès.</p>
        <p>Vous recevrez un email de suivi dès l'expédition de vos produits agricoles.</p>
        <hr />
        <p style="color: #4CAF50;">L'équipe Agro E-Commerce</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
  console.log(`✅ Email de confirmation envoyé à ${toEmail}`);
};

module.exports = { sendOrderConfirmation };
