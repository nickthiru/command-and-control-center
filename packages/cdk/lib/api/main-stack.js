const { Stack, CfnOutput } = require("aws-cdk-lib");
const { RestApi, Deployment, Stage, Cors, CognitoUserPoolsAuthorizer, AuthorizationType } = require("aws-cdk-lib/aws-apigateway");
const { AccountApiEndpointsStack } = require("./endpoints-stack/account");
const { DeviceMgmtApiEndpointsStack } = require("./endpoints-stack/device-mgmt");

class ApiStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'ApiStack'");

    const {
      // authStack,
      // accountStack,
      deviceMgmtStack,
    } = props;


    /*** API ***/

    const restApi = new RestApi(this, "RestApi");

    // const authorizer = new CognitoUserPoolsAuthorizer(this, "CognitoUserPoolsAuthorizer", {
    //   cognitoUserPools: [authStack.consumerUserPool],
    //   identitySource: "method.request.header.Authorization",
    // });
    // authorizer._attachToApi(restApi);

    // Attach this to each Resource
    // const optionsWithAuth = {
    //   authorizationType: AuthorizationType.COGNITO,
    //   authorizer: {
    //     authorizerId: authorizer.authorizerId,
    //   },
    // };

    // Attach this to each HTTP Method endpoint, for each Resource, that requires authenticated access
    const optionsWithCors = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS
      }
    };

    // const deployment = new Deployment(this, "Deployment", {
    //   api: restApi,
    // });


    // Stages

    // const devStage = new Stage(this, "dev", {
    //   deployment: deployment,
    //   stageName: "dev",
    // });


    /*** API Endpoints of Services */

    // new AccountApiEndpointsStack(this, "AccountApiEndpointsStack", {
    //   restApi,
    //   optionsWithCors,
    //   accountStack,  // To access Lambda integration
    // });

    new DeviceMgmtApiEndpointsStack(this, "DeviceMgmtApiEndpointsStack", {
      restApi,
      optionsWithCors,   // Set this on each resource
      // optionsWithAuth,   // Set this on each resource method (that requires authenticated access)
      deviceMgmtStack,  // To access Lambda integration
    });



    /*** Outputs ***/

    // new CfnOutput(this, "", {
    //   value: ``,
    //   description: " dev stage URL",
    //   exportName: ""
    // });
  }
}

module.exports = { ApiStack };