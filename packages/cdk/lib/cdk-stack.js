const { Stack } = require('aws-cdk-lib');
// const { AuthStack } = require('./auth/main-stack');
// const { AccountMgmtStack } = require('./account-mpmt/main-stack');
const { ApiStack } = require('./api/api-stack');
const { DeviceMgmtStack } = require('./device-mgmt/device-mgmt-stack');
const { PolicyStack } = require('./policy/policy-stack');
const { DataStack } = require('./data/data-stack');
const { MapStack } = require('./map/map-stack');

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);


    /*** Utilities ***/

    const dataStack = new DataStack(this, "DataStack");

    // const authStack = new AuthStack(this, "AuthStack")

    const policyStack = new PolicyStack(this, "PolicyStack");

    const apiStack = new ApiStack(this, "ApiStack", {
      dataStack,
      // authStack,
    });


    /*** Business Domains ***/

    // const accountMgmtStack = new AccountMgmtStack(this, "AccountMgmtStack", {
    //   apiStack,
    //   authStack,
    // });

    const deviceMgmtStack = new DeviceMgmtStack(this, "DeviceMgmtStack", {
      apiStack,
      policyStack,
    });

    new MapStack(this, "MapStack", {
      apiStack,
    })
  }
}

module.exports = { CdkStack }
