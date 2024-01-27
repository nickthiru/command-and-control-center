const { Construct } = require("constructs");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { Duration } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");
const path = require("path");


const packageLockJsonFile = "../../../../../package-lock.json";


class ConfirmSignUp extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'ConfirmSignUp' construct");

    const { consumerUserPoolClientId } = props;
    console.log("(+) consumerUserPoolClientId: " + consumerUserPoolClientId);


    const lambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      // memorySize: 512,
      timeout: Duration.minutes(1),
      entry: (path.join(__dirname, "../../../src/account/workflow/confirm-sign-up.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: {
        CONSUMER_USER_POOL_CLIENT_ID: consumerUserPoolClientId,
      }
    });

    this.lambdaIntegration = new LambdaIntegration(lambda);
  }
}

module.exports = { ConfirmSignUp };