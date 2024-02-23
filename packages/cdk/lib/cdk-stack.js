const { Stack } = require('aws-cdk-lib');
// const { AuthStack } = require('./auth/main-stack');
// const { AccountMgmtStack } = require('./account-mpmt/main-stack');
const { ApiStack } = require('./api/api-stack');
const { DeviceMgmtStack } = require('./device-mgmt/device-mgmt-stack');
const { PolicyStack } = require('./policy/policy-stack');
// const { DataStack } = require('./data/data-stack');

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // const dataStack = new DataStack(this, "DataStack");

    // const authStack = new AuthStack(this, "AuthStack")
    // const consumerUserPoolId = authStack.consumerUserPool.userPoolId;
    // const consumerUserPoolClientId = authStack.consumerUserPoolClient.userPoolClientId;

    // const accountMgmtStack = new AccountMgmtStack(this, "AccountMgmtStack", {
    //   consumerUserPoolClientId,
    // });

    const policyStack = new PolicyStack(this, "PolicyStack");

    const deviceMgmtStack = new DeviceMgmtStack(this, "DeviceMgmtStack", {
      policyStack,
    });

    new ApiStack(this, "ApiStack", {
      // dataStack,
      // authStack,
      // accountMgmtStack,
      deviceMgmtStack,
    });

  }
}

module.exports = { CdkStack }
