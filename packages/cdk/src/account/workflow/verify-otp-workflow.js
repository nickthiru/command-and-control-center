const { CognitoIdentityProviderClient, ConfirmSignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");

// For local dev
require('dotenv').config()


const cognitoClient = new CognitoIdentityProviderClient();


exports.handler = async function verifyOtpWorkflow(event, context) {
  console.log("Inside 'verifyOtpWorkflow' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));
  console.log("context: \n" + JSON.stringify(context, null, 2));

  const consumerUserPoolClientId = process.env.CONSUMER_USER_POOL_CLIENT_ID
  console.log("consumerUserPoolClientId: " + consumerUserPoolClientId);

  try {
    const response = cognitoClient.send(new ConfirmSignUpCommand({ // ConfirmSignUpRequest
      ClientId: consumerUserPoolClientId,
      Username: "nickthiru",
      ConfirmationCode: "161498",
    }));

    console.log("(+) response: " + JSON.stringify(response));

  } catch (error) {
    console.log(error);
  }
};