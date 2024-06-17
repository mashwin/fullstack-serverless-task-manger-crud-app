import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const lambdaHandler = async (event, context) => {
  try {
    const { id } = event.pathParameters;
    const params = {
      TableName: "tasks",
      Key: {
        id,
      },
    };

    const response = await docClient.send(new DeleteCommand(params));
    return {
      status: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      status: 500,
      body: JSON.stringify(error),
    };
  }
};

export const handler = middy().use(httpErrorHandler()).handler(lambdaHandler);
