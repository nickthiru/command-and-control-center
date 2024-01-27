const { NestedStack } = require("aws-cdk-lib");


class AccountApiEndpointsStack extends NestedStack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'AccountEndpoints'");

    const {
      restApi,
      optionsWithCors,
      accountStack,
    } = props;


    // account
    const account = restApi.root.addResource("account", optionsWithCors);

    // POST account/sign-up
    const signUp = account.addResource("sign-up");
    signUp.addMethod("POST", accountStack.signUp.lambdaIntegration);

    // POST account/confirm-sign-up
    const confirmSignUp = account.addResource("confirm-sign-up");
    confirmSignUp.addMethod("POST", accountStack.confirmSignUp.lambdaIntegration);

    // POST account/sign-in
    const signIn = account.addResource("sign-in");
    signIn.addMethod("POST", accountStack.signIn.lambdaIntegration);
  }
}

module.exports = { AccountApiEndpointsStack };