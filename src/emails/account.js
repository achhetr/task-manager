const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
	sgMail
		.send({
			to: email,
			from: process.env.FROM_EMAIL,
			subject: 'Thanks for joining in',
			text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
		})
		.then((res) => console.log('Email sent'))
		.catch((err) => console.log('Error: ', err));
};

const sendCancelEmail = (email, name) => {
	sgMail
		.send({
			to: email,
			from: process.env.FROM_EMAIL,
			subject: 'Goodbye! :(, Is there anything we could have done?',
			text: `We hope to see you again, ${name}`,
		})
		.then((res) => console.log('Email sent'))
		.catch((err) => console.log('Error: ', err));
};

module.exports = {
	sendWelcomeEmail,
	sendCancelEmail,
};
