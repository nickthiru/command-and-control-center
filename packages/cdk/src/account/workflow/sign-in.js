const { CognitoIdentityProviderClient, InitiateAuthCommand } = require("@aws-sdk/client-cognito-identity-provider");

const Account = require("../service.js");
const Api = require("../../api/service.js");

// For local dev
// require('dotenv').config();

const cognitoClient = new CognitoIdentityProviderClient();


exports.handler = async (event) => {
  console.log("Inside 'signIn' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));


  const [
    consumerUserPoolClientId,
    authFlow,
  ] = getProcessData(process);

  const [
    emailAddress,
    username,
    password,
  ] = getEventData(event);

  const signInResult = await Account.signIn(
    cognitoClient,
    InitiateAuthCommand,
    consumerUserPoolClientId,
    authFlow,
    emailAddress,
    username,
    password,
  );

  const response = prepareResponse(signInResult);

  return response;
}

function getProcessData(process) {
  console.log("Inside 'getProcessData()'");

  const consumerUserPoolClientId = process.env.CONSUMER_USER_POOL_CLIENT_ID;
  console.log("consumerUserPoolClientId: " + consumerUserPoolClientId);

  const authFlow = process.env.AUTH_FLOW;
  console.log("authFlow: " + authFlow);

  return [
    consumerUserPoolClientId,
    authFlow,
  ]
}

function getEventData(event) {
  console.log("Inside 'getEventData()'");

  const body = JSON.parse(event.body);
  console.log("(+) body.EmailAddress: " + body.EmailAddress);
  console.log("(+) body.Username: " + body.Username);
  console.log("(+) body.Password: " + body.Password);

  const emailAddress = body.EmailAddress;
  const username = body.Username;
  const password = body.Password;
  console.log("(+) emailAddress: " + emailAddress);
  console.log("(+) username: " + username);
  console.log("(+) password: " + password);

  return [
    emailAddress,
    username,
    password,
  ];
}

function prepareResponse(signInResult) {
  console.log("Inside 'prepareResponse()'");

  const corsHeader = Api.addCorsHeader();
  console.log("(+) corsHeadear: " + JSON.stringify(corsHeader));

  const headers = {
    ...corsHeader,
  };
  console.log("(+) headers: " + JSON.stringify(headers));

  const body = JSON.stringify({
    AccessToken: signInResult.accessToken,
    ExpiresIn: signInResult.expiresIn,
  });
  console.log("(+) body: " + JSON.stringify(body));

  return {
    statusCode: 200,
    headers: headers,
    body: body,
  };
}