const { CognitoIdentityProviderClient, InitiateAuthCommand } = require("@aws-sdk/client-cognito-identity-provider");

// const Account = require("../service.js");
const Api = require("../../api/http/service.js");

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

  // const signInResult = await Account.signIn(
  //   cognitoClient,
  //   InitiateAuthCommand,
  //   consumerUserPoolClientId,
  //   authFlow,
  //   emailAddress,
  //   username,
  //   password,
  // );

  try {

    const initiateAuthResponse = await cognitoClient.send(new InitiateAuthCommand({
      ClientId: consumerUserPoolClientId,
      AuthFlow: authFlow,
      AuthParameters: {
        // EMAIL: emailAddress,
        USERNAME: username,
        PASSWORD: password,
      },
    }));

    // { // InitiateAuthResponse
    //   ChallengeName: "SMS_MFA" || "SOFTWARE_TOKEN_MFA" || "SELECT_MFA_TYPE" || "MFA_SETUP" || "PASSWORD_VERIFIER" || "CUSTOM_CHALLENGE" || "DEVICE_SRP_AUTH" || "DEVICE_PASSWORD_VERIFIER" || "ADMIN_NO_SRP_AUTH" || "NEW_PASSWORD_REQUIRED",
    //   Session: "STRING_VALUE",
    //   ChallengeParameters: { // ChallengeParametersType
    //     "<keys>": "STRING_VALUE",
    //   },
    //   AuthenticationResult: { // AuthenticationResultType
    //     AccessToken: "STRING_VALUE",
    //     ExpiresIn: Number("int"),
    //     TokenType: "STRING_VALUE",
    //     RefreshToken: "STRING_VALUE",
    //     IdToken: "STRING_VALUE",
    //     NewDeviceMetadata: { // NewDeviceMetadataType
    //       DeviceKey: "STRING_VALUE",
    //       DeviceGroupKey: "STRING_VALUE",
    //     },
    //   },
    // };
    console.log("(+) initiateAuthResponse: " + JSON.stringify(initiateAuthResponse, null, 2));

    var accessToken = initiateAuthResponse.AuthenticationResult.AccessToken;
    var expiresIn = initiateAuthResponse.AuthenticationResult.ExpiresIn

    // return {
    //   accessToken,
    //   expiresIn,
    // };

  } catch (error) {
    console.log(error);
  }

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