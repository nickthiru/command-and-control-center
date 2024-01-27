const { CognitoIdentityProviderClient, ConfirmSignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");

const Account = require("../service.js");
const Api = require("../../api/service.js");

// For local dev
// require('dotenv').config();

const cognitoClient = new CognitoIdentityProviderClient();


exports.handler = async (event) => {
  console.log("Inside 'confirmSignUp' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));

  const [consumerUserPoolClientId] = getProcessData(process);

  const [
    username,
    confirmationCode,
  ] = getEventData(event);

  const confirmSignUpResult = await Account.confirmSignUp(
    cognitoClient,
    ConfirmSignUpCommand,
    consumerUserPoolClientId,
    username,
    confirmationCode,
  );

  const response = prepareResponse();

  return response;
}

function getProcessData(process) {
  console.log("Inside 'getProcessData()'");

  const consumerUserPoolClientId = process.env.CONSUMER_USER_POOL_CLIENT_ID;
  console.log("consumerUserPoolClientId: " + consumerUserPoolClientId);

  return [
    consumerUserPoolClientId,
  ]
}

function getEventData(event) {
  console.log("Inside 'getEventData()'");

  const body = JSON.parse(event.body);
  console.log("(+) body.Username: " + body.Username);
  console.log("(+) body.ConfirmationCode: " + body.ConfirmationCode);

  const username = body.Username;
  const confirmationCode = body.ConfirmationCode;
  console.log("(+) username: " + username);
  console.log("(+) confirmationCode: " + confirmationCode);

  return [
    username,
    confirmationCode,
  ];
}

function prepareResponse() {
  console.log("Inside 'prepareResponse()'");

  const corsHeader = Api.addCorsHeader();
  console.log("(+) corsHeadear: " + JSON.stringify(corsHeader));

  const headers = {
    ...corsHeader,
  };
  console.log("(+) headers: " + JSON.stringify(headers));

  // const body = JSON.stringify(confirmSignUpResult);
  // console.log("(+) body: " + JSON.stringify(body));

  const body = JSON.stringify({
    Message: "User account OTP verification complete."
  });
  console.log("(+) body: " + JSON.stringify(body));

  return {
    statusCode: 200,
    headers: headers,
    body: body,
  };
}