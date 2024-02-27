const { Stack } = require("aws-cdk-lib");


class AccountLambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'AccountStack'");

    const {
      consumerUserPoolClientId
    } = props;

    const accountLambdaHandlersDirectoryPath = "../../../src/lambda/account";
    const packageLockJsonFile = "../../../../../package-lock.json";


    /*** Backend Workflows ***/




    /*** Frontend Workflows ***/

    this.signUpLambda = new NodejsFunction(this, "AccountSignUpLambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      // memorySize: 512,
      // timeout: Duration.minutes(1),
      entry: (path.join(__dirname, `${accountLambdaHandlersDirectoryPath}/sign-up.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: {
        CONSUMER_USER_POOL_CLIENT_ID: consumerUserPoolClientId,
      }
    });

    this.confirmSignUpLambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      // memorySize: 512,
      // timeout: Duration.minutes(1),
      entry: (path.join(__dirname, `${accountLambdaHandlersDirectoryPath}/confirm-sign-up.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: {
        CONSUMER_USER_POOL_CLIENT_ID: consumerUserPoolClientId,
      }
    });

    this.signInLambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      // memorySize: 512,
      // timeout: Duration.minutes(1),
      entry: (path.join(__dirname, `${accountLambdaHandlersDirectoryPath}/sign-in.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: {
        CONSUMER_USER_POOL_CLIENT_ID: consumerUserPoolClientId,
        AUTH_FLOW: "USER_PASSWORD_AUTH",
      },
    });
  }
}

module.exports = { AccountLambdaStack };