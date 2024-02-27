const { Stack } = require("aws-cdk-lib");
const { MapLambdaStack } = require("./map/map-lambda-stack");
const { DeviceLambdaStack } = require("./device/device-lambda-stack");
// const { AccountLambdaStack } = require("./account/account-lambda-stack");


class LambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'SnsStack'");


    this.account = new AccountLambdaStack(this, "AccountLambdaStack");

    this.device = new DeviceLambdaStack(this, "DeviceLambdaStack");

    this.map = new MapLambdaStack(this, "MapLambdaStack");
  }
}

module.exports = { LambdaStack };