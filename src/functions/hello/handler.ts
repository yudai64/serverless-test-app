import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { DynamoDB } from "aws-sdk";

import schema from "./schema";
import { dynamodb } from "@libs/dynamodb";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  // const dynamodb = new DynamoDB.DocumentClient({
  //   region: "localhost",
  //   endpoint: "http://localhost:8000",
  // });

  await dynamodb
    .put({
      TableName: "usersTable",
      Item: {
        email: "test2@yassun.com",
      },
    })
    .promise();

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
