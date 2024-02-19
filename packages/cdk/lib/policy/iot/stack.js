const { Stack } = require("aws-cdk-lib");
// const { CreateThingType } = require("./workflow/create-thing-type");
// const { CreateThing } = require("./workflow/create-thing");
const { CfnPolicy } = require("aws-cdk-lib/aws-iot");


class IotPolicyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'IotPolicyStack'");

    // const {
    //   consumerUserPoolClientId
    // } = props;

    // this.createThingType = new CreateThingType(this, "CreateThingType");

    // this.createThing = new CreateThing(this, "CreateThing");

    // this.iotAllAccessCfnPolicy = new CfnPolicy(this, "IotAllAccessCfnPolicy", {
    //   policyDocument: JSON.stringify({
    //     Version: "2012-10-17",
    //     Statement: [
    //       {
    //         Effect: "Allow",
    //         Action: [
    //           "iot:*"
    //         ],
    //         Resource: "*"
    //       }
    //     ]
    //   }),
    // });

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