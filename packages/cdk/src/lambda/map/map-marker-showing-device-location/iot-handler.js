const {
  IoTClient,
  DescribeThingCommand,
  UpdateThingCommand
} = require("@aws-sdk/client-iot");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");


const iotClient = new IoTClient();
const snsClient = new SNSClient();


exports.handler = async (event) => {
  console.log("Inside 'iot-handler' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));

  const {
    deviceLocationsUpdatedTopicArn,
    deviceLocationsUpdatedTopicName,
  } = getEnvData(process);

  const {
    deviceId,
    longitude,
    latitude,
  } = getEventData(event);


  try {

    const describeThingResponse = await iotClient.send(new DescribeThingCommand({
      thingName: deviceId,
    }));
    // console.log("(+) res1: " + JSON.stringify(res1, null, 2));

    if (!describeThingResponse.attributes.long && !describeThingResponse.attributes.lat) {
      console.log("(+) Device does not have attributes, so adding...");

      await iotClient.send(new UpdateThingCommand({
        thingName: deviceId,
        attributePayload: {
          attributes: {
            long: String(longitude),
            lat: String(latitude),
          }
        }
      }));

      // Publish to SNS Topic, which is connected to WebSocketToWebClientRoute's queue
      const publishResponse = await snsClient.send(new PublishCommand({
        TopicArn: deviceLocationsUpdatedTopicArn,
        Message: JSON.stringify({
          event: deviceLocationsUpdatedTopicName,
        }),
      }));
      console.log("publishResponse: " + JSON.stringify(publishResponse));
    }
  } catch (error) {
    console.log(error);
  }
}



function getEnvData(process) {
  console.log("Inside 'getEnvData()'");

  const deviceLocationsUpdatedTopicArn = process.env.DEVICE_LOCATIONS_UPDATED_TOPIC_ARN;
  console.log("deviceGpsReceivedTopicArn: " + deviceLocationsUpdatedTopicArn);

  const deviceLocationsUpdatedTopicName = process.env.DEVICE_LOCATIONS_UPDATED_TOPIC_NAME;
  console.log("deviceGpsReceivedTopicName: " + deviceLocationsUpdatedTopicName);

  return {
    deviceLocationsUpdatedTopicArn,
    deviceLocationsUpdatedTopicName,
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