const { Stack } = require("aws-cdk-lib");
const { CreateThingTypeWorkflowConstruct } = require("./workflow/create-thing-type-workflow-construct");


class ThingTypeWorkflowsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'DeviceMgmtStack'");

    const {
      apiStack,
    } = props;


    // /device-mgmt/thing-type
    apiStack.httpStack.restApi.root
      .getResource("device-mgmt")
      .addResource("thing-type");

    // const resource = apiStack.httpStack.restApi.root.getResource("device-mgmt");
    // resource.addResource("thing-type");


    this.createThingTypeWorkflow = new CreateThingTypeWorkflowConstruct(this, "CreateThingTypeWorkflowConstruct", {
      apiStack,
    });
  }
}

module.exports = { ThingTypeWorkflowsStack };