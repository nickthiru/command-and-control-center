const { Stack } = require("aws-cdk-lib");
const { TopicRule, IotSql } = require("@aws-cdk/aws-iot-alpha");
const { LambdaFunctionAction } = require("@aws-cdk/aws-iot-actions-alpha");


class IotStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'IotStack'");

    const {
      lambdaStack,
    } = props;


    this.deviceGpsDataReceivedTopicRule = new TopicRule(this, "DeviceGpsDataReceivedTopicRule", {
      // topicRuleName: "UpdateMapWithDeviceTopicRule",
      description: "Longitude and latitude coordinates of a device, to update the map with a marker",
      sql: IotSql.fromStringAsVer20160323("SELECT topic(3) AS deviceId, lo AS longitude, la AS latitude FROM 'dt/map/+'"),
      actions: [new LambdaFunctionAction()]
    });
  }
}

module.exports = { IotStack };