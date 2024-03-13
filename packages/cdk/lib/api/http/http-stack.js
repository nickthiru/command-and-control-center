const { Stack, CfnOutput } = require("aws-cdk-lib");
const { RestApi, Deployment, Stage, Cors, CognitoUserPoolsAuthorizer, AuthorizationType } = require("aws-cdk-lib/aws-apigateway");
// const { AccountApiEndpointsStack } = require("./api-endpoints/account-endpoints-stack");
// const { DeviceApiEndpointsStack } = require("./api-endpoints/device-endpoints-stack");


class HttpStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'HttpStack'");

    const {
      // auth,
      // lambda,
    } = props;


    /*** API ***/

    this.restApi = new RestApi(this, "RestApi");

    // const authorizer = new CognitoUserPoolsAuthorizer(this, "CognitoUserPoolsAuthorizer", {
    //   cognitoUserPools: [authStack.consumerUserPool],
    //   identitySource: "method.request.header.Authorization",
    // });
    // authorizer._attachToApi(restApi);

    // Attach this to each Resource
    // this.optionsWithAuth = {
    //   authorizationType: AuthorizationType.COGNITO,
    //   authorizer: {
    //     authorizerId: authorizer.authorizerId,
    //   },
    // };

    // Attach this to each HTTP Method endpoint, for each Resource, that requires authenticated access
    this.optionsWithCors = {
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



    /*** Services API Endpoints ***/

    // new AccountApiEndpointsStack(this, "AccountApiEndpointsStack", {
    //   lambdaStack,
    // });
    // new DeviceApiEndpointsStack(this, "DeviceApiEndpointsStack", {
    //   lambdaStack,
    // });



    /*** Outputs ***/

    // new CfnOutput(this, "", {
    //   value: ``,
    //   description: " dev stage URL",
    //   exportName: ""
    // });
  }
}

module.exports = { HttpStack };