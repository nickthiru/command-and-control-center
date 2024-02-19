const { Stack } = require("aws-cdk-lib");
const { CreateThingType } = require("./workflow/create-thing-type");
const { CreateThing } = require("./workflow/create-thing");


class DeviceMgmtStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'DeviceMgmtStack'");

    const {
      policyStack,
    } = props;


    /*** Backend Workflows ***/




    /*** Frontend Workflows ***/

    this.createThingType = new CreateThingType(this, "CreateThingType");

    this.createThing = new CreateThing(this, "CreateThing", {
      iotAllAccessPolicyName: policyStack.iot.allAccess.policyName,
    });

  }
}

module.exports = { DeviceMgmtStack };