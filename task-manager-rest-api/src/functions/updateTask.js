import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const lambdaHandler = async (event, context) => {
  try {
    const { id } = event.pathParameters;
    const { title, isCompleted } = event.body;

    const params = {
      TableName: "tasks",
      Key: {
        id,
      },
      UpdateExpression:
        "SET #title = :title, #isCompleted = :isCompleted, #updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#title": "title",
        "#isCompleted": "isCompleted",
        "#updatedAt": "updatedAt",
      },
      ExpressionAttributeValues: {
        ":title": title,
        ":isCompleted": isCompleted,
        ":updatedAt": new Date().toISOString(),
      },
      ReturnValues: "ALL_NEW",
    };

    const response = await docClient.send(new UpdateCommand(params));

    console.log("*** response ***", response);

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

export const handler = middy()
  .use(jsonBodyParser())
  .use(httpErrorHandler())
  .handler(lambdaHandler);
