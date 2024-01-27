const { CognitoIdentityProviderClient, SignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");

const Account = require("../service.js");
const Api = require("../../api/service.js");

// For local dev
// require('dotenv').config();

const cognitoClient = new CognitoIdentityProviderClient();


exports.handler = async (event) => {
  console.log("Inside 'signUp' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));


  const [consumerUserPoolClientId] = getProcessData(process);

  const [
    username,
    password,
    emailAddress,
  ] = getEventData(event);

  const signUpResult = await Account.signUp(
    cognitoClient,
    SignUpCommand,
    consumerUserPoolClientId,
    username,
    password,
    emailAddress,
  );

  // const response = prepareResponse(signUpResult);
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
  console.log("(+) body.Password: " + body.Password);
  console.log("(+) body.EmailAddress: " + body.EmailAddress);

  const username = body.Username;
  const password = body.Password;
  const emailAddress = body.EmailAddress;
  console.log("(+) username: " + username);
  console.log("(+) password: " + password);
  console.log("(+) emailAddress: " + emailAddress);

  return [
    username,
    password,
    emailAddress,
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

  // const body = JSON.stringify(signUpResult);
  // console.log("(+) body: " + JSON.stringify(body));

  const body = JSON.stringify({
    Message: "User account registered. Needs confirmation via OTP."
  });
  console.log("(+) body: " + JSON.stringify(body));

  return {
    statusCode: 200,
    headers: headers,
    body: body,
  };
}