const { Construct } = require("constructs");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
// const { Duration } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");
const path = require("path");


const packageLockJsonFile = "../../../../../package-lock.json";


class CreateThingWorkflow extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'CreateThing' construct");

    const { iotAllAccessPolicyName } = props;


    const lambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      // memorySize: 512,
      // timeout: Duration.minutes(1),
      entry: (path.join(__dirname, "../../../src/device-mgmt/workflow/create-thing.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: {
        IOT_ALL_ACCESS_POLICY_NAME: iotAllAccessPolicyName,
      }
    });

    lambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ["arn:aws:iot:us-east-1:346761569124:thing/*"],
      actions: ["iot:CreateThing"],
    }));

    this.lambdaIntegration = new LambdaIntegration(lambda);
  }
}

module.exports = { CreateThingWorkflow };