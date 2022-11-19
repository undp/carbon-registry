import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer = require('nodemailer');
import { EmailTemplates } from './email.template';

@Injectable()
export class EmailService {

    private transporter;
    private CHAR_SET: 'UTF-8';

    private sourceEmail: string;

    constructor(private logger: Logger, private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>("email.endpoint"),
            port: 465,
            secure: true,
            auth: {
              user: this.configService.get<string>("email.username"),
              pass: this.configService.get<string>("email.password"),
            },
        });
    }

    public async sendEmail(sendToEmail: string, template, templateData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.transporter.sendMail({
                from: this.sourceEmail,
                to: sendToEmail,
                subject: template["subject"],
                text: template["text"], // plain text body
                html: template["html"], // html body
            }, function(error, info) {
                if (error) {
                    console.log(error);
                    reject(error)
                } else {
                    console.log('Email sent: ' + info);
                    resolve(info)
                }
            });
        })
    }
}
