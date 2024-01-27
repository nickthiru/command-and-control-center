module.exports = async function signIn(
  cognitoClient,
  InitiateAuthCommand,
  consumerUserPoolClientId,
  authFlow,
  emailAddress,
  username,
  password,
) {
  console.log("(+) Inside 'signIn' service method");
  console.log("(+) consumerUserPoolClientId: " + consumerUserPoolClientId);
  console.log("(+) authFlow: " + authFlow);
  console.log("(+) emailAddress: " + emailAddress);
  console.log("(+) username: " + username);
  console.log("(+) password: " + password);

  console.log("'InitiateAuthCommand' input object: \n" + JSON.stringify({
    ClientId: consumerUserPoolClientId,
    AuthFlow: authFlow,
    AuthParameters: {
      // EMAIL: emailAddress,
      USERNAME: emailAddress,
      PASSWORD: password,
    },
  }, null, 2));

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

    const accessToken = initiateAuthResponse.AuthenticationResult.AccessToken;
    const expiresIn = initiateAuthResponse.AuthenticationResult.ExpiresIn

    return {
      accessToken,
      expiresIn,
    };

  } catch (error) {
    console.log(error);
  }
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