import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESClient, SendTemplatedEmailCommand } from "@aws-sdk/client-ses";


@Injectable()
export class EmailService {

    private ses = new SESClient({ apiVersion: '2010-12-01' });
    private sourceEmail: string;

    constructor(private logger: Logger, private configService: ConfigService) {
        this.sourceEmail = this.configService.get<string>('email.source');
    }

    public async sendEmail(sendToEmail: string, emailTemplateName: string, templateData: any): Promise<any> {
        const params = {
            Destination: {
                ToAddresses: [
                    sendToEmail
                ]
            },
            Source: this.sourceEmail,
            Template: emailTemplateName + "_" + "dev", //stage
            TemplateData: JSON.stringify(templateData),
        };
        return (await this.ses.send(new SendTemplatedEmailCommand(params)));
    }
}
