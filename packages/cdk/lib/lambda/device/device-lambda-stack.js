const { Stack } = require("aws-cdk-lib");
const { ThingTypeWorkflowsStack } = require("./thing-type/thing-type-workflows-stack");
const { ThingWorkflowsStack } = require("./thing/thing-workflows-stack");


class DeviceLambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'DeviceMgmtStack'");

    const {
      apiStack,
      policyStack,
    } = props;


    // /device-mgmt
    apiStack.httpStack.restApi.root.addResource("device-mgmt", apiStack.httpStack.optionsWithCors);


    this.createThingTypeLambda = new NodejsFunction(this, "Lambda", {
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

    new ThingTypeWorkflowsStack(this, "ThingTypeStack", {
      apiStack,
    });

    new ThingWorkflowsStack(this, "ThingStack", {
      apiStack,
      policyStack,
    });
  }
}

module.exports = { DeviceLambdaStack };