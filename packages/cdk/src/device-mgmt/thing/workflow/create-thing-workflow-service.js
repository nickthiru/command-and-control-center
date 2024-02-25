const {
  IoTClient,
  CreateThingCommand,
  CreateKeysAndCertificateCommand,
  AttachPolicyCommand,
  AttachThingPrincipalCommand
} = require("@aws-sdk/client-iot");

// const DeviceMgmt = require("../service.js");
const Api = require("../../../api/http/service.js");

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


  try {

    var {
      thingArn,
      thingId,
    } = await iotClient.send(new CreateThingCommand({
      thingName,
      // thingTypeName: "",
      attributePayload: {
        attributes: {
          thingDescription,
        },
        // merge: true,
      },
    }));
    console.log("thingArn: " + thingArn);
    console.log("thingId: " + thingId);

    var {
      certificateArn,
      certificateId,
      certificatePem,
      keyPair,
    } = await iotClient.send(new CreateKeysAndCertificateCommand({
      setAsActive: true,
    }));
    console.log("certificateArn: " + certificateArn);
    console.log("certificateId: " + certificateId);
    console.log("certificatePem: " + certificatePem);
    console.log("keyPair: " + JSON.stringify(keyPair, null, 2));

    await iotClient.send(new AttachPolicyCommand({
      policyName: iotAllAccessPolicyName,
      target: certificateArn,
    }));

    await iotClient.send(new AttachThingPrincipalCommand({
      thingName: thingName,
      principal: certificateArn,
    }));

  } catch (error) {
    console.log(error);
  }

  const httpResponse = prepareHttpResponse(
    thingName,
    thingDescription,
    thingArn,
    thingId,
  );

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


function prepareHttpResponse(
  thingName,
  thingDescription,
  thingArn,
  thingId
) {
  console.log("Inside 'prepareResponse()'");

  const corsHeader = Api.addCorsHeader();
  console.log("(+) corsHeadear: " + JSON.stringify(corsHeader));

  const headers = {
    ...corsHeader,
  };
  console.log("(+) headers: " + JSON.stringify(headers));

  const body = JSON.stringify({
    ThingName: thingName,
    ThingDescription: thingDescription,
    ThingArn: thingArn,
    ThingId: thingId,
  });
  console.log("(+) body: " + JSON.stringify(body));

  return {
    statusCode: 200,
    headers: headers,
    body: body,
  };
}