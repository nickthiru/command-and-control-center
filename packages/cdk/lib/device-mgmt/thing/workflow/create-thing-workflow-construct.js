const { Construct } = require("constructs");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
// const { Duration } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");
const path = require("path");


class CreateThingWorkflowConstruct extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'CreateThing' construct");

    const {
      apiStack,
      policyStack,
    } = props;


    const lambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      // memorySize: 512,
      // timeout: Duration.minutes(1),
      entry: (path.join(__dirname, "../../../../src/device-mgmt/thing/workflow/create-thing-workflow-service.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, "../../../../../../package-lock.json")),
      environment: {
        IOT_ALL_ACCESS_POLICY_NAME: policyStack.iot.allAccess.policyName,
      }
    });

    lambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ["arn:aws:iot:us-east-1:346761569124:thing/*"],
      actions: ["iot:CreateThing"],
    }));

    // POST /device-mgmt/thing
    apiStack.httpStack.restApi.root
      .getResource("device-mgmt")
      .getResource("thing")
      .addMethod("POST", new LambdaIntegration(lambda));

    // const resource = apiStack.httpStack.restApi.root.getResource("device-mgmt").getResource("thing");

    // resource.addMethod("POST", new LambdaIntegration(lambda));

    // resource.addMethod(
    //   "POST",
    //   new LambdaIntegration(lambda),
    //   apiStack.httpStack.optionsWithAuth
    // );
  }
}

module.exports = { CreateThingWorkflowConstruct };