const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns"); // CommonJS import


const snsClient = new SNSClient();


exports.handler = async (event) => {
  console.log("Inside 'map-marker-showing-device-location' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));

  const {
    deviceGpsReceivedTopicArn,
    deviceGpsReceivedTopicName,
  } = getEnvData(process);

  const {
    deviceId,
    longitude,
    latitude,
  } = getEventData(event);


  try {

    // var sendMessageCommandResponse = await sqsClient.send(new SendMessageCommand({
    //   QueueUrl: webSocketToWebClientRouteQueueUrl,
    //   MessageBody: JSON.stringify({
    //     triggerEvent,
    //     deviceId,
    //     longitude,
    //     latitude,
    //   }),
    // }));
    // console.log("sendMessageCommandResponse: " + JSON.stringify(sendMessageCommandResponse, null, 2));

    // Publish to SNS Topic, which is connected to WebSocketToWebClientRoute's queue
    const publishCommandResponse = await snsClient.send(new PublishCommand({
      TopicArn: deviceGpsReceivedTopicArn,
      Message: JSON.stringify({
        event: deviceGpsReceivedTopicName,
        deviceId,
        longitude,
        latitude,
      }),
    }));
    console.log("publishCommandResponse: " + JSON.stringify(publishCommandResponse));
    // return response;

  } catch (error) {
    console.log(error);
  }
}



function getEnvData(process) {
  console.log("Inside 'getEnvData()'");

  const deviceGpsReceivedTopicArn = process.env.DEVICE_GPS_RECEIVED_TOPIC_ARN;
  console.log("deviceGpsReceivedTopicArn: " + deviceGpsReceivedTopicArn);

  const deviceGpsReceivedTopicName = process.env.DEVICE_GPS_RECEIVED_TOPIC_NAME;
  console.log("deviceGpsReceivedTopicName: " + deviceGpsReceivedTopicName);

  return {
    deviceGpsReceivedTopicArn,
    deviceGpsReceivedTopicName,
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