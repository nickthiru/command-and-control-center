const { CognitoJwtVerifier } = require("aws-jwt-verify");

// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.userPoolId,
  clientId: process.env.userPoolClientId,
  tokenUse: "access"
});

exports.handler = async function (event, context, callback) {
  console.log("Inside websocket-authorizer-handler.js");
  console.log('event:', JSON.stringify(event));

  // A simple REQUEST authorizer example to demonstrate how to use request 
  // parameters to allow or deny a request. In this example, a request is  
  // authorized if the client-supplied HeaderAuth1 header and QueryString1 query parameter
  // in the request context match the specified values of
  // of 'headerValue1' and 'queryValue1' respectively.

  // Retrieve request parameters from the Lambda function input:
  const headers = event.headers;
  const queryStringParameters = event.queryStringParameters;
  const stageconstiables = event.stageconstiables;
  const requestContext = event.requestContext;

  // Parse the input for the parameter values
  const tmp = event.methodArn.split(':');
  const apiGatewayArnTmp = tmp[5].split('/');
  const awsAccountId = tmp[4];
  const region = tmp[3];
  const ApiId = apiGatewayArnTmp[0];
  const stage = apiGatewayArnTmp[1];
  const route = apiGatewayArnTmp[2];

  // Perform authorization to return the Allow policy for correct parameters and 
  // the 'Unauthorized' error, otherwise.
  const authResponse = {};
  const condition = {};
  condition.IpAddress = {};

  console.log("queryStringParameters: " + queryStringParameters.token);

  try {
    const payload = await verifier.verify(
      queryStringParameters.token // the JWT as string
    );
    console.log("Token is valid. Payload: ", payload);
    callback(null, generateAllow("user", event.methodArn));
  } catch (err) {
    console.log("Token not valid! Error: ", err);
    callback("Unauthorized");
  }

  // if (headers.HeaderAuth1 === "headerValue1"
  //   && queryStringParameters.QueryString1 === "queryValue1") {
  //   callback(null, generateAllow('me', event.methodArn));
  // } else {
  //   callback("Unauthorized");
  // }
};

// Helper function to generate an IAM policy
const generatePolicy = function (principalId, effect, resource) {
  // Required output:
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17'; // default version
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke'; // default action
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  // Optional output with custom properties of the String, Number or Boolean type.
  authResponse.context = {
    "stringKey": "stringval",
    "numberKey": 123,
    "booleanKey": true
  };
  console.log(JSON.stringify(authResponse));
  return authResponse;
};

const generateAllow = function (principalId, resource) {
  return generatePolicy(principalId, 'Allow', resource);
}

// const generateDeny = function (principalId, resource) {
//   return generatePolicy(principalId, 'Deny', resource);
// }
