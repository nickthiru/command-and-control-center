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

    var initiateAuthCommandResponse = await cognitoClient.send(new InitiateAuthCommand({
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
    console.log("(+) initiateAuthCommandResponse: " + JSON.stringify(initiateAuthCommandResponse, null, 2));

  } catch (error) {
    console.log(error);
  }

  const response = prepareResponse(initiateAuthCommandResponse);

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


function prepareResponse(initiateAuthCommandResponse) {
  console.log("Inside 'prepareResponse()'");

  const corsHeader = Api.addCorsHeader();
  console.log("(+) corsHeadear: " + JSON.stringify(corsHeader));

  const headers = {
    ...corsHeader,
  };
  console.log("(+) headers: " + JSON.stringify(headers));

  const body = JSON.stringify({
    AccessToken: initiateAuthCommandResponse.AuthenticationResult.AccessToken,
    ExpiresIn: initiateAuthCommandResponse.AuthenticationResult.ExpiresIn,
  });
  console.log("(+) body: " + JSON.stringify(body));

  return {
    statusCode: 200,
    headers: headers,
    body: body,
  };
}

/*
Error:

NotAuthorizedException: Incorrect username or password.
    at de_NotAuthorizedExceptionRes (C:\Users\nickt\Projects\movie-review-app\node_modules\@aws-sdk\client-cognito-identity-provider\dist-cjs\protocols\Aws_json1_1.js:6419:23)
    at de_InitiateAuthCommandError (C:\Users\nickt\Projects\movie-review-app\node_modules\@aws-sdk\client-cognito-identity-provider\dist-cjs\protocols\Aws_json1_1.js:4321:25)
    at process.processTicksAndRejections (c:\Users\nickt\Projects\movie-review-app\lib\internal\process\task_queues.js:95:5)
    at async C:\Users\nickt\Projects\movie-review-app\node_modules\@smithy\middleware-serde\dist-cjs\deserializerMiddleware.js:7:24
    at async C:\Users\nickt\Projects\movie-review-app\node_modules\@smithy\middleware-retry\dist-cjs\retryMiddleware.js:31:46
    at async C:\Users\nickt\Projects\movie-review-app\node_modules\@aws-sdk\middleware-logger\dist-cjs\loggerMiddleware.js:7:26
    at async Object.signIn (c:\Users\nickt\Projects\movie-review-app\packages\cdk\src\account\service-method\sign-in.js:12:34)
    at async exports.handler (c:\Users\nickt\Projects\movie-review-app\packages\cdk\src\account\workflow\sign-in.js:28:24)
    at async main (C:\Users\nickt\Projects\movie-review-app\packages\cdk\src\runner.js:16:20) {name: 'NotAuthorizedException', $fault: 'client', $metadata: {…}, __type: 'NotAuthorizedException', stack: 'NotAuthorizedException: Incorrect username or…-review-app\packages\cdk\src\runner.js:16:20)', …}

*/