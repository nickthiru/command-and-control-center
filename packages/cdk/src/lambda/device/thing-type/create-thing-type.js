const { IoTClient, CreateThingTypeCommand } = require("@aws-sdk/client-iot");

const DeviceMgmt = require("../../service.js");
const Api = require("../../../api/http/service.js");

// For local dev
// require('dotenv').config();

const iotClient = new IoTClient();


exports.handler = async (event) => {
  console.log("Inside 'create-thing-type' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));


  // const [
  //   consumerUserPoolClientId,
  //   authFlow,
  // ] = getProcessData(process);

  const [
    thingTypeName,
    thingTypeDescription,
  ] = getEventData(event);

  const createThingTypeResponse = await DeviceMgmt.createThingType(
    iotClient,
    CreateThingTypeCommand,
    thingTypeName,
    thingTypeDescription
  );

  const httpResponse = prepareHttpResponse(createThingTypeResponse);

  return httpResponse;
}

// function getProcessData(process) {
//   console.log("Inside 'getProcessData()'");

//   const consumerUserPoolClientId = process.env.CONSUMER_USER_POOL_CLIENT_ID;
//   console.log("consumerUserPoolClientId: " + consumerUserPoolClientId);

//   const authFlow = process.env.AUTH_FLOW;
//   console.log("authFlow: " + authFlow);

//   return [
//     consumerUserPoolClientId,
//     authFlow,
//   ]
// }

function getEventData(event) {
  console.log("Inside 'getEventData()'");

  const body = JSON.parse(event.body);

  const thingTypeName = body.ThingTypeName;
  const thingTypeDescription = body.ThingTypeDescription;
  console.log("(+) thingTypeName: " + thingTypeName);
  console.log("(+) thingTypeDescription: " + thingTypeDescription);

  return [
    thingTypeName,
    thingTypeDescription,
  ];
}

function prepareHttpResponse(createThingTypeResponse) {
  console.log("Inside 'prepareResponse()'");

  const corsHeader = Api.addCorsHeader();
  console.log("(+) corsHeadear: " + JSON.stringify(corsHeader));

  const headers = {
    ...corsHeader,
  };
  console.log("(+) headers: " + JSON.stringify(headers));

  const body = JSON.stringify({
    ThingTypeName: createThingTypeResponse.thingTypeName,
    ThingTypeArn: createThingTypeResponse.thingTypeArn,
    ThingTypeId: createThingTypeResponse.thingTypeId,
  });
  console.log("(+) body: " + JSON.stringify(body));

  return {
    statusCode: 200,
    headers: headers,
    body: body,
  };
}