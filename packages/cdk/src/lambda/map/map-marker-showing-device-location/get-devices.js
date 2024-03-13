const {
  IoTClient,
  ListThingsCommand,
} = require("@aws-sdk/client-iot");
// const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const Api = require("../../../api/http/service.js");


const iotClient = new IoTClient();
// const snsClient = new SNSClient();


exports.handler = async (event) => {
  console.log("Inside 'get-devices' handler");
  // console.log("event: \n" + JSON.stringify(event, null, 2));

  // const {
  //   deviceLocationsUpdatedTopicArn,
  //   deviceLocationsUpdatedTopicName,
  // } = getEnvData(process);

  // const {
  //   deviceId,
  //   longitude,
  //   latitude,
  // } = getEventData(event);


  try {

    const { things, nextToken } = await iotClient.send(new ListThingsCommand({
      nextToken: null,
    }));
    // console.log("(+) listThingsResponse: " + JSON.stringify(listThingsResponse, null, 2));
    if (nextToken) {
      console.log("(+) nextToken: " + nextToken);
    }

    var responseBody = things.map((thing) => {
      return {
        deviceId: thing.thingName,
        long: thing.attributes.long,
        lat: thing.attributes.lat,
      }
    });
    console.log("(+) responseBody: " + JSON.stringify(responseBody, null, 2));


    // const input = { // ListThingsRequest
    //   nextToken: "STRING_VALUE",
    //   maxResults: Number("int"),
    //   attributeName: "STRING_VALUE",
    //   attributeValue: "STRING_VALUE",
    //   thingTypeName: "STRING_VALUE",
    //   usePrefixAttributeValue: true || false,
    // };

    // { // ListThingsResponse
    //   things: [ // ThingAttributeList
    //     { // ThingAttribute
    //       thingName: "STRING_VALUE",
    //       thingTypeName: "STRING_VALUE",
    //       thingArn: "STRING_VALUE",
    //       attributes: { // Attributes
    //         "<keys>": "STRING_VALUE",
    //       },
    //       version: Number("long"),
    //     },
    //   ],
    //   nextToken: "STRING_VALUE",
    // };

  } catch (error) {
    console.log(error);
  }

  const response = prepareResponse(responseBody);
  console.log("(+) response: " + JSON.stringify(response, null, 2));

  return response;
}



// function getEnvData(process) {
//   console.log("Inside 'getEnvData()'");

//   const deviceLocationsUpdatedTopicArn = process.env.DEVICE_LOCATIONS_UPDATED_TOPIC_ARN;
//   console.log("deviceGpsReceivedTopicArn: " + deviceLocationsUpdatedTopicArn);

//   const deviceLocationsUpdatedTopicName = process.env.DEVICE_LOCATIONS_UPDATED_TOPIC_NAME;
//   console.log("deviceGpsReceivedTopicName: " + deviceLocationsUpdatedTopicName);

//   return {
//     deviceLocationsUpdatedTopicArn,
//     deviceLocationsUpdatedTopicName,
//   };
// }


// function getEventData(event) {
//   console.log("Inside 'getEventData()'");

//   const {
//     deviceId,
//     longitude,
//     latitude
//   } = event;
//   console.log("(+) deviceId: " + deviceId);
//   console.log("(+) longitude: " + longitude);
//   console.log("(+) latitude: " + latitude);

//   return {
//     deviceId,
//     longitude,
//     latitude,
//   };
// }



function prepareResponse(responseBody) {
  console.log("Inside 'prepareResponse()'");

  const corsHeader = Api.addCorsHeader();
  console.log("(+) corsHeadear: " + JSON.stringify(corsHeader));

  const headers = {
    ...corsHeader,
  };
  console.log("(+) headers: " + JSON.stringify(headers));

  const body = JSON.stringify(responseBody);
  console.log("(+) body: " + body);

  return {
    statusCode: 200,
    headers: headers,
    body: body,
  };
}