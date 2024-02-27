const { Stack } = require("aws-cdk-lib");
const { LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");


class AccountApiEndpointsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'AccountApiEndpointsStack'");

    const {
      restApi,
      optionsWithCors,
      accountStack,
      lambdaStack,
    } = props;

    new LambdaIntegration(lambdaStack.accountLambdaStack.accountSignUpLambda);




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