const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");


const sqsClient = new SQSClient();


exports.handler = async (event) => {
  console.log("Inside 'update-map-with-device-workflow-service' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));

  const {
    webSocketToWebClientRouteQueueUrl,
  } = getProcessData(process);

  const {
    deviceId,
    longitude,
    latitude,
  } = getEventData(event);


  try {

    var sendMessageCommandResponse = await sqsClient.send(new SendMessageCommand({
      QueueUrl: webSocketToWebClientRouteQueueUrl,
      MessageBody: JSON.stringify({
        deviceId,
        longitude,
        latitude,
      }),
    }));
    console.log("sendMessageCommandResponse: " + JSON.stringify(sendMessageCommandResponse, null, 2));

  } catch (error) {
    console.log(error);
  }

  return;
}



function getProcessData(process) {
  console.log("Inside 'getProcessData()'");

  const webSocketToWebClientRouteQueueUrl = process.env.WEBSOCKET_TO_WEB_CLIENT_ROUTE_QUEUE_URL;
  console.log("webSocketToWebClientRouteQueueUrl: " + webSocketToWebClientRouteQueueUrl);

  return {
    webSocketToWebClientRouteQueueUrl,
  };
}


function getEventData(event) {
  console.log("Inside 'getEventData()'");

  const {
    deviceId,
    longitude,
    latitude
  } = event;
  console.log("(+) deviceId: " + deviceId);
  console.log("(+) longitude: " + longitude);
  console.log("(+) latitude: " + latitude);

  return {
    deviceId,
    longitude,
    latitude,
  };
}