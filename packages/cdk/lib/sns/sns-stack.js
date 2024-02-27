const { Stack } = require("aws-cdk-lib");
const { MapSnsStack } = require("./map/map-sns-stack");


class SnsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'SnsStack'");

    this.map = new MapSnsStack(this, "MapSnsStack");
  }
}

module.exports = { SnsStack };