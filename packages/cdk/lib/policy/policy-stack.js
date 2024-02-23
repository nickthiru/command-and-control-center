const { Stack } = require("aws-cdk-lib");
const { IotPolicyStack } = require("./iot/iot-policy-stack");


class PolicyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'PolicyStack'");

    this.iot = new IotPolicyStack(this, "IotPolicyStack");

  }
}

module.exports = { PolicyStack };