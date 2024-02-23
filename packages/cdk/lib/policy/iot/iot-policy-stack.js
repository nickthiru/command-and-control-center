const { Stack } = require("aws-cdk-lib");
const { CfnPolicy } = require("aws-cdk-lib/aws-iot");


class IotPolicyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'IotPolicyStack'");

    this.allAccess = new CfnPolicy(this, "IotAllAccessCfnPolicy", {
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: [
              "iot:*"
            ],
            Resource: "*"
          }
        ]
      },
    });
  }
}

module.exports = { IotPolicyStack };