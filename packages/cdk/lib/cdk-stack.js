const { Stack } = require('aws-cdk-lib');
// const { AuthStack } = require('./auth/main-stack');
// const { AccountMgmtStack } = require('./account-mpmt/main-stack');
const { ApiStack } = require('./api/api-stack');
const { DeviceMgmtStack } = require('./device-mgmt/device-mgmt-stack');
const { PolicyStack } = require('./policy/policy-stack');
const { StorageStack } = require('./storage/storage-stack');
const { MapStack } = require('./map/map-stack');
const { IotStack } = require('./iot/iot-stack');
const { SnsStack } = require('./sns/sns-stack');
const { LambdaStack } = require('./lambda/lambda-stack');


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

    const storage = new StorageStack(this, "StorageStack");

    // const auth = new AuthStack(this, "AuthStack")

    const policy = new PolicyStack(this, "PolicyStack");

    const sns = new SnsStack(this, "SnsStack");

    const lambda = new LambdaStack(this, "LambdaStack", {
      sns,
    });

    const iot = new IotStack(this, "IotStack", {
      lambda,
    });

    const apiStack = new ApiStack(this, "ApiStack", {
      data,
      // auth,
      lambda,
      storage,
    });


    /*** Business Domains ***/

    // const accountMgmtStack = new AccountMgmtStack(this, "AccountMgmtStack", {
    //   apiStack,
    //   authStack,
    // });

    // const deviceMgmtStack = new DeviceMgmtStack(this, "DeviceMgmtStack", {
    //   apiStack,
    //   policyStack,
    // });

    // new MapStack(this, "MapStack", {
    //   apiStack,
    //   snsStack,
    //   iotStack,
    // });
  }
}

module.exports = { CdkStack }
