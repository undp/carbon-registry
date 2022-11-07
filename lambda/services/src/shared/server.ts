import { createLogger } from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Server } from 'http';
import * as winston from 'winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const express = require('express');

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

function setupSwagger(nestApp: INestApplication, name: string, httpBase: String): void {
    const config = new DocumentBuilder()
      .setTitle(`${name} API`)
      .setDescription(`${name} API Documentation`)
      .setVersion('0.0.1')
      .addServer(`/${process.env.NODE_ENV}`)
      .build();
  
    const document = SwaggerModule.createDocument(nestApp, config);
  
    SwaggerModule.setup(`${httpBase}/docs`, nestApp, document, {
      customSiteTitle: 'API Documentation',
      swaggerOptions: {
        docExpansion: 'none',
        operationSorter: 'alpha',
        tagSorter: 'alpha',
      },
    });
}

export async function bootstrapServer(cachedServer: Server, module: any, httpBase: string): Promise<Server> {
    if (!cachedServer) {
        const instance = createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.ms(),
                    nestWinstonModuleUtilities.format.nestLike(module.name, {
                        // options
                    }),
                    )
                })
            ]
        });

        const expressApp = express();
        const nestApp = await NestFactory.create(module, new ExpressAdapter(expressApp), {
            logger: WinstonModule.createLogger({
              instance,
            }),
          })
          nestApp.setGlobalPrefix(httpBase)
        nestApp.use(eventContext());
        setupSwagger(nestApp, module.name, httpBase)
        await nestApp.init();
        cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
}