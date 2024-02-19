const {
  IoTClient,
  CreateThingCommand,
  CreateKeysAndCertificateCommand,
  AttachPolicyCommand,
  AttachThingPrincipalCommand
} = require("@aws-sdk/client-iot");

const DeviceMgmt = require("../service.js");
const Api = require("../../api/service.js");

// For local dev
// require('dotenv').config();

const iotClient = new IoTClient();


exports.handler = async (event) => {
  console.log("Inside 'create-thing-type' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));


  const [
    iotAllAccessPolicyName,
  ] = getProcessData(process);

  const [
    thingName,
    thingDescription,
  ] = getEventData(event);

  const createThingResponse = await DeviceMgmt.createThing(
    iotClient,
    CreateThingCommand,
    thingName,
    thingDescription
  );

  const httpResponse = prepareHttpResponse(createThingResponse);

  return httpResponse;
}

function getProcessData(process) {
  console.log("Inside 'getProcessData()'");

  const iotAllAccessPolicyName = process.env.IOT_ALL_ACCESS_POLICY_NAME;
  console.log("iotAllAccessPolicyName: " + iotAllAccessPolicyName);

  return [
    iotAllAccessPolicyName,
  ]
}

function getEventData(event) {
  console.log("Inside 'getEventData()'");

  const body = JSON.parse(event.body);

  const thingName = body.ThingName;
  const thingDescription = body.ThingDescription;
  console.log("(+) thingTypeName: " + thingName);
  console.log("(+) thingTypeDescription: " + thingDescription);

  return [
    thingName,
    thingDescription,
  ];
}

function prepareHttpResponse(createThingResponse) {
  console.log("Inside 'prepareResponse()'");

  const {
    thingTypeName,
    thingTypeArn,
    thingTypeId,
  } = createThingResponse;

  const corsHeader = Api.addCorsHeader();
  console.log("(+) corsHeadear: " + JSON.stringify(corsHeader));

  const headers = {
    ...corsHeader,
  };
  console.log("(+) headers: " + JSON.stringify(headers));

  const body = JSON.stringify({
    ThingTypeName: thingTypeName,
    ThingTypeArn: thingTypeArn,
    ThingTypeId: thingTypeId,
  });
  console.log("(+) body: " + JSON.stringify(body));

  return {
    statusCode: 200,
    headers: headers,
    body: body,
  };
}