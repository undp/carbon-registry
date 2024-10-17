import { NestFactory } from "@nestjs/core";
import { Handler, Context } from "aws-lambda";
import { getLogger } from "carbon-services-lib_ci";
import { AsyncOperationsHandlerInterface } from "carbon-services-lib_ci";
import { AsyncOperationsModuleMain } from "carbon-services-lib_ci";

export const handler: Handler = async (event: any, context: Context) => {
  const app = await NestFactory.createApplicationContext(
    AsyncOperationsModuleMain,
    {
      logger: getLogger(AsyncOperationsModuleMain),
    }
  );

  await app.get(AsyncOperationsHandlerInterface).asyncHandler(event);
};
