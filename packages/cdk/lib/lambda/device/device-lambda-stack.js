const { Stack } = require("aws-cdk-lib");
const { ThingWorkflowsStack } = require("./thing/thing-workflows-stack");
const { ThingTypeLambdaStack } = require("./thing-type/thing-type-lambda-stack");


class DeviceLambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'DeviceLambdaStack'");

    const {
      apiStack,
      policyStack,
    } = props;


    // /device-mgmt
    // apiStack.httpStack.restApi.root.addResource("device-mgmt", apiStack.httpStack.optionsWithCors);

    this.thingType = new ThingTypeLambdaStack(this, "ThingTypeLambdaStack", {
      apiStack,
    });

    new ThingWorkflowsStack(this, "ThingStack", {
      apiStack,
      policyStack,
    });
  }
}

module.exports = { DeviceLambdaStack };