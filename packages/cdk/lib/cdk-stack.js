const { Stack } = require('aws-cdk-lib');
const { AuthStack } = require('./stack/auth-stack');
// const { WorkflowStack } = require('./stack/workflow-stack');
// const { ApiStack } = require('./stack/api-stack');

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const authStack = new AuthStack(this, "AuthStack")

    const consumerUserPoolId = authStack.consumerUserPool.userPoolId;
    const consumerUserPoolClientId = authStack.consumerUserPoolClient.userPoolClientId;


    // const workflowStack = new WorkflowStack(this, "WorkflowStack", {
    //   consumerUserPoolClientId,
    // });


    // new ApiStack(this, "ApiStack");

  }
}

module.exports = { CdkStack }
