const { Stack } = require("aws-cdk-lib");
const { IotPolicyStack } = require("./iot/stack");
// const { CreateThingType } = require("./workflow/create-thing-type");
// const { CreateThing } = require("./workflow/create-thing");


class PolicyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'PolicyStack'");

    // const {
    //   consumerUserPoolClientId
    // } = props;

    // this.createThingType = new CreateThingType(this, "CreateThingType");

    // this.createThing = new CreateThing(this, "CreateThing");

    this.iot = new IotPolicyStack(this, "IotPolicyStack");

  }
}

module.exports = { PolicyStack };