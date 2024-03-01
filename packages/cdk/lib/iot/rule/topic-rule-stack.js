const { Stack } = require("aws-cdk-lib");
const { TopicRule, IotSql } = require("@aws-cdk/aws-iot-alpha");
const { LambdaFunctionAction } = require("@aws-cdk/aws-iot-actions-alpha");


class TopicRuleStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'TopicRuleStack'");

    const {
      lambda,
    } = props;


    this.deviceGpsReceivedFromIot = new TopicRule(this, "DeviceGpsReceivedTopicRule", {
      // topicRuleName: "UpdateMapWithDeviceTopicRule",
      description: "Longitude and latitude coordinates of a device, to update the map with a marker",
      sql: IotSql.fromStringAsVer20160323("SELECT topic(3) AS deviceId, lo AS longitude, la AS latitude FROM 'dt/map/+'"),
      actions: [new LambdaFunctionAction(lambda.map.processDeviceGpsFromIot)]
    });
  }
}

module.exports = { TopicRuleStack };

processDeviceGpsData