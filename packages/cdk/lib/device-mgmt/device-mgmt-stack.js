const { Stack } = require("aws-cdk-lib");
const { CreateThingTypeWorkflow } = require("./workflow/create-thing-type-workflow-construct");
const { CreateThingWorkflow } = require("./workflow/create-thing-workflow-construct");


class DeviceMgmtStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'DeviceMgmtStack'");

    const {
      policyStack,
    } = props;


    /*** Backend Workflows ***/




    /*** Frontend Workflows ***/

    this.createThingType = new CreateThingTypeWorkflow(this, "CreateThingType");

    this.createThing = new CreateThingWorkflow(this, "CreateThing", {
      iotAllAccessPolicyName: policyStack.iot.allAccess.policyName,
    });

  }
}

module.exports = { DeviceMgmtStack };