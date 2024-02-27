const { Stack } = require("aws-cdk-lib");
const { Topic } = require("aws-cdk-lib/aws-sns");


class MapSnsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'MapSnsStack'");


    this.deviceGpsDataReceivedTopic = new Topic(this, "DeviceGpsDataReceivedTopic");
  }
}

module.exports = { MapSnsStack };