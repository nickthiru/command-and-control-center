const { Stack } = require('aws-cdk-lib');
// const { AuthStack } = require('./auth/main-stack');
// const { AccountStack } = require('./account/main-stack');
const { ApiStack } = require('./api/main-stack');
const { DeviceMgmtStack } = require('./device-mgmt/main-stack');
const { PolicyStack } = require('./policy/main-stack');

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // const authStack = new AuthStack(this, "AuthStack")
    // const consumerUserPoolId = authStack.consumerUserPool.userPoolId;
    // const consumerUserPoolClientId = authStack.consumerUserPoolClient.userPoolClientId;


    // const accountStack = new AccountStack(this, "AccountStack", {
    //   consumerUserPoolClientId,
    // });

    const policyStack = new PolicyStack(this, "PolicyStack");

    const deviceMgmtStack = new DeviceMgmtStack(this, "DeviceMgmtStack", {
      policyStack,
    });


    new ApiStack(this, "ApiStack", {
      // authStack,
      // accountStack,
      deviceMgmtStack,
    });

  }
}

module.exports = { CdkStack }
