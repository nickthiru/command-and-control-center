const { Stack } = require("aws-cdk-lib");
const { ThingTypeWorkflowsStack } = require("./thing-type/thing-type-workflows-stack");
const { ThingWorkflowsStack } = require("./thing/thing-workflows-stack");


class DeviceMgmtStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'DeviceMgmtStack'");

    const {
      api,
      policy,
    } = props;


    // /device-mgmt
    // apiStack.httpStack.restApi.root.addResource("device-mgmt", apiStack.httpStack.optionsWithCors);


    new ThingTypeWorkflowsStack(this, "ThingTypeStack", {
      api,
    });

    new ThingWorkflowsStack(this, "ThingStack", {
      api,
      policy,
    });
  }
}

module.exports = { DeviceMgmtStack };