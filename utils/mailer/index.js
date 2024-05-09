// import nodemailer from 'nodemailer';
// import * as handlebars from 'handlebars';
// import * as fs from 'fs';
// import * as path from 'path';
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');


class Mailer {
    transporter() {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            //disable certificate verification
            tls: {
                rejectUnauthorized: false
            }
        })
    }

    async sendMail(mailOptions) {
        try {
            const transporter = this.transporter();
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(error);
        }
    }

    async mailCustomizer(htmlFilePath, replacements) {
        const filePath = path.join(__dirname, htmlFilePath);
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const htmlToSend = template(replacements);
        return htmlToSend;
    }

    async parseTemplate(path, replacements){
        const htmlToSend = await this.mailCustomizer(path, replacements)
        return htmlToSend;
    }

    
}

module.exports = Mailer;

