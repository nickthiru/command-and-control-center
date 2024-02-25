const { Stack, CfnOutput, Duration } = require("aws-cdk-lib");
const { UserPool, VerificationEmailStyle, AccountRecovery } = require("aws-cdk-lib/aws-cognito");


class AuthStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'AuthStack'");

    this.userPool = new UserPool(this, "UserPool", {
      selfSignUpEnabled: true,
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      signInAliases: {
        username: true,
        email: true
      },
      keepOriginal: {
        email: true,
      },
      signInCaseSensitive: false,
      userVerification: {
        emailSubject: "Verify you email for our Movie Review App",
        emailBody: "Thanks for signing up to our awesome app! Your verification code is {####}. This code is valid for 24 hours.",
        emailStyle: VerificationEmailStyle.CODE,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      standardAttributes: {
        email: {
          required: true,
          mutable: false,
        }
      },
    });


    // const clientWriteAttributes = (new cognito.ClientAttributes())
    //   .withStandardAttributes({ fullname: true, email: true })
    //   .withCustomAttributes('favouritePizza', 'favouriteBeverage');

    // const clientReadAttributes = clientWriteAttributes
    //   .withStandardAttributes({ emailVerified: true })
    //   .withCustomAttributes('pointsEarned');

    this.userPoolClient = this.userPool.addClient("UserPoolClient", {
      authFlows: {
        userPassword: true,
      },
      accessTokenValidity: Duration.hours(8),
      // readAttributes: clientReadAttributes,
      // writeAttributes: clientWriteAttributes,
    });


    /*** Outputs ***/

    // For web client Auth service

    new CfnOutput(this, "ConsumerUserPoolId", {
      value: this.consumerUserPool.userPoolId,
      description: "Cognito user pool ID used by AWS Amplify in the web client's auth service",
      exportName: "ConsumerUserPoolId"
    });

    new CfnOutput(this, "ConsumerUserPoolClientId", {
      value: this.consumerUserPoolClient.userPoolClientId,
      description: "Cognito user pool client ID used by AWS Amplify in the web client's auth service",
      exportName: "ConsumerUserPoolClientId"
    });
  }

}

module.exports = { AuthStack };