const { Construct } = require("constructs");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
// const { Duration } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");
const path = require("path");


class CreateThingTypeWorkflowConstruct extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'CreateThingType' construct");

    const {
      apiStack,
    } = props;


    const lambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      // memorySize: 512,
      // timeout: Duration.minutes(1),
      entry: (path.join(__dirname, "../../../../src/device-mgmt/thing-type/workflow/create-thing-type-workflow-service.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, "../../../../../../package-lock.json")),
    });

    lambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ["arn:aws:iot:us-east-1:346761569124:thingtype/*"],
      actions: ["iot:CreateThingType"],
    }));

    // POST /device-mgmt/thing-type
    apiStack.httpStack.restApi.root
      .getResource("device-mgmt")
      .getResource("thing-type")
      .addMethod("POST", new LambdaIntegration(lambda));

    // const resource = apiStack.httpStack.restApi.root.getResource("device-mgmt").getResource("thing-type");

    // resource.addMethod("POST", new LambdaIntegration(lambda));

    // resource.addMethod(
    //   "POST",
    //   new LambdaIntegration(lambda),
    //   apiStack.httpStack.optionsWithAuth
    // );
  }
}

module.exports = { CreateThingTypeWorkflowConstruct };