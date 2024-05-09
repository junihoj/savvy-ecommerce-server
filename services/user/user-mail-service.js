const {userMailTemplate} = require("../../constants/mail-template-path")
const Mailer = require("../../utils/mailer");

class UserMailService extends Mailer{
    async sendActivationMail(email, replacements){
        const htmlToSend = await this.parseTemplate(userMailTemplate.activationEmailPath,replacements);
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: `no-reply <${process.env.STORE_NAME}> Email Verification`,
            html: htmlToSend
        }
        await this.sendMail(mailOptions);
    }
    
}

module.exports = UserMailService;

