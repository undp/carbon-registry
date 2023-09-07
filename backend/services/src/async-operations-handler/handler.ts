import { NestFactory } from "@nestjs/core";
import { Handler, Context } from "aws-lambda";
import { AsyncOperationsHandlerInterface, AsyncOperationsModule, getLogger } from "carbon-services-lib";

export const handler: Handler = async (event: any, context: Context) => {
  const app = await NestFactory.createApplicationContext(
    AsyncOperationsModule,
    {
      logger: getLogger(AsyncOperationsModule),
    }
  );

  await app.get(AsyncOperationsHandlerInterface).asyncHandler(event);
};
