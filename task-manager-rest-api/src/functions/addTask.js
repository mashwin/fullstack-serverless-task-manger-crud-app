import { v4 as uuidv4 } from "uuid";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const lambdaHandler = async (event, context) => {
  try {
    const { title } = event.body;

    const params = {
      TableName: "tasks",
      Item: {
        id: uuidv4(),
        title: title,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      },
    };

    const response = await docClient.send(new PutCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};

export const handler = middy()
  .use(jsonBodyParser())
  .use(httpErrorHandler())
  .handler(lambdaHandler);
