const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const ddbClient = new DynamoDBClient();

exports.handler = async (event, context, callback) => {
  console.log("Inside 'connect-route-handler'");
  console.log("event: " + JSON.stringify(event, null, 2));
  console.log("process.env.webSocketConnectionsTableName: " + process.env.APP_TABLE_NAME);

  const webSocketConnectionId = event.requestContext.connectionId;

  try {
    const result = await ddbClient.send(new PutItemCommand({
      TableName: process.env.APP_TABLE_NAME,
      Item: marshall({
        PK: "WEBSOCKET_CONNECTION_ID",
        SK: `WEBSOCKET_CONNECTION_ID#${webSocketConnectionId}`,
        webSocketConnectionId: webSocketConnectionId,
      }),
      // Item: {
      //   connectionId: { S: event.requestContext.connectionId }  // WebSocket connection ID
      // }
    }));
    console.log(result);
  } catch (err) {
    console.error(err);
  };

  const response = {
    statusCode: 200,
  };

  callback(null, response);
}
