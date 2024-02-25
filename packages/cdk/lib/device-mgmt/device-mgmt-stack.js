const { Stack } = require("aws-cdk-lib");
const { ThingTypeWorkflowsStack } = require("./thing-type/thing-type-workflows-stack");
const { ThingWorkflowsStack } = require("./thing/thing-workflows-stack");


class DeviceMgmtStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'DeviceMgmtStack'");

    const {
      apiStack,
      policyStack,
    } = props;


    // /device-mgmt
    apiStack.httpStack.restApi.root.addResource("device-mgmt", apiStack.httpStack.optionsWithCors);


    new ThingTypeWorkflowsStack(this, "ThingTypeStack", {
      apiStack,
    });

    new ThingWorkflowsStack(this, "ThingStack", {
      apiStack,
      policyStack,
    });
  }
}

module.exports = { DeviceMgmtStack };