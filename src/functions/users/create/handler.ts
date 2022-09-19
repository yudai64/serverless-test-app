import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import { dynamodb } from "@libs/dynamodb";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { email, username, age } = event.body;

  await dynamodb
    .put({
      TableName: "usersTable",
      Item: {
        email,
        username,
        age,
      },
    })
    .promise();

  return formatJSONResponse({
    message: "Success",
  });
};

export const main = middyfy(hello, schema);
