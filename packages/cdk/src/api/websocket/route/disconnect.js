const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const ddbClient = new DynamoDBClient();

exports.handler = async (event, context, callback) => {
  console.log("Inside disconnect-route-handler.js");
  console.log("event: " + JSON.stringify(event, null, 2));
  console.log("process.env.webSocketConnectionsTableName: " + process.env.APP_TABLE_NAME);

  const webSocketConnectionId = event.requestContext.connectionId;
  console.log("webSocketConnectionId: " + webSocketConnectionId);


  try {
    const result = await ddbClient.send(new DeleteItemCommand({
      TableName: process.env.APP_TABLE_NAME,
      Key: marshall({
        PK: "WEBSOCKET_CONNECTION_ID",
        SK: `WEBSOCKET_CONNECTION_ID#${webSocketConnectionId}`,
      }),
    }));
    console.log(result);
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 200,
  }
}