/*
  Remember to register an "event" at the end of each task/function to SNS.
*/

const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require("@aws-sdk/client-apigatewaymanagementapi");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

const { unmarshall } = require("@aws-sdk/util-dynamodb");


const apiGwMgmtApiClient = new ApiGatewayManagementApiClient({
  endpoint: process.env.WEBSOCKET_API_CONNECTION_URL
});

const ddbClient = new DynamoDBClient();


exports.handler = async (event, context, callback) => {
  console.log("Inside 'to web client' handler");
  console.log("event: " + JSON.stringify(event));

  // 'event' object is sent by SQS
  const eventBody = JSON.parse(event["Records"][0]["body"]);

  try {

    const queryCommandResponse = await ddbClient.send(new QueryCommand({
      TableName: process.env.APP_TABLE_NAME,
      KeyConditionExpression: "#PK = :PK",
      ProjectionExpression: "#webSocketConnectionId",
      ExpressionAttributeNames: {
        "#PK": "PK",
        "#webSocketConnectionId": "webSocketConnectionId",
      },
      ExpressionAttributeValues: {
        ":PK": "WEBSOCKET_CONNECTION_ID",
      },
    }));
    console.log("(+) queryCommandResponse: \n" + JSON.stringify(queryCommandResponse, null, 2));


    queryCommandResponse["Items"].forEach(async (Item) => {

      console.log("webSocketConnectionId: " + Item.webSocketConnectionId);

      console.log("sending message...");
      const postToConnectionCommandResponse = await apiGwMgmtApiClient.send(new PostToConnectionCommand({
        ConnectionId: Item.webSocketConnectionId,
        Data: JSON.stringify(eventBody),
      }));
      console.log("postToConnectionCommandResponse: " + JSON.stringify(postToConnectionCommandResponse, null, 2));
    });

    // Items.forEach(async (Item) => {
    //   const unmarshalledItem = unmarshall(Item);
    //   console.log("connectionId: " + String(unmarshalledItem["webSocketConnectionId"]));
    //   console.log("sending message...");

    //   try {
    //     const result = await apiGwMgmtApiClient.send(new PostToConnectionCommand({
    //       ConnectionId: unmarshalledItem["connectionId"],
    //       Data: body["Message"]
    //     }));
    //     console.log("result: " + result);
    //   }
    //   catch (err) {
    //     console.error(err);
    //   }
    // });

  } catch (err) {
    console.error(err);
  }

  const response = {
    statusCode: 200
  }

  callback(null, response);
};
