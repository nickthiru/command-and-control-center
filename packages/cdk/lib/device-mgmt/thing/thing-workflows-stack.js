const { Stack } = require("aws-cdk-lib");
const { CreateThingWorkflowConstruct } = require("./workflow/create-thing-workflow-construct");


class ThingWorkflowsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'DeviceMgmtStack'");

    const {
      apiStack,
      policyStack,
    } = props;


    // /device-mgmt/thing
    apiStack.httpStack.restApi.root
      .getResource("device-mgmt")
      .addResource("thing");

    // const resource = apiStack.httpStack.restApi.root.getResource("device-mgmt");
    // resource.addResource("thing");


    this.createThingWorkflow = new CreateThingWorkflowConstruct(this, "CreateThingWorkflowConstruct", {
      apiStack,
      policyStack,
    });
  }
}

module.exports = { ThingWorkflowsStack };