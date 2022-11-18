import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

var AWS = require('aws-sdk');
// AWS.config.update({region: 'REGION'});

@Injectable()
export class EmailService {

    private ses = new AWS.SES({ apiVersion: '2010-12-01' });
    private sourceEmail: string;

    constructor(private logger: Logger, private configService: ConfigService) {
        this.sourceEmail = this.configService.get<string>('email.source');
    }

    public async sendEmail(sendToEmail: string, emailTemplateName: string, templateData: any): Promise<void> {
        const params = {
            Destination: {
                CcAddresses: [
                ],
                ToAddresses: [
                    sendToEmail
                ]
            },
            Source: this.sourceEmail,
            Template: emailTemplateName,
            TemplateData: templateData,
        };
        return (await this.ses.sendTemplatedEmail(params).promise());
    }
}
