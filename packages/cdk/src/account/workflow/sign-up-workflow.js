const { CognitoIdentityProviderClient, SignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");

// For local dev
require('dotenv').config()


const cognitoClient = new CognitoIdentityProviderClient();


exports.handler = async function signUpWorkflow(event, context) {
  console.log("Inside 'signUpWorkflow' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));
  console.log("context: \n" + JSON.stringify(context, null, 2));

  const consumerUserPoolClientId = process.env.CONSUMER_USER_POOL_CLIENT_ID
  console.log("consumerUserPoolClientId: " + consumerUserPoolClientId);

  try {
    const response = cognitoClient.send(new SignUpCommand({
      ClientId: consumerUserPoolClientId,
      Username: "nickthiru",
      Password: "Test1234!",
      UserAttributes: [
        {
          Name: "email",
          Value: "nickthiru@gmail.com",
        }
      ]
    }));

    console.log("(+) response: " + JSON.stringify(response));

  } catch (error) {
    console.log(error);
  }
};