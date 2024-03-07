const { Stack, CfnOutput } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
// const { Duration } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { LambdaFunctionAction } = require("@aws-cdk/aws-iot-actions-alpha");
const { TopicRule, IotSql } = require("@aws-cdk/aws-iot-alpha");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const path = require("path");


class MapMarkerShowingDeviceLocation extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'MapMarkerShowingDeviceLocation'");

    const {
      api,
    } = props;


    const outputEventTopic = new Topic(this, "DeviceLocationsUpdatedTopic", {
      topicName: "DeviceLocationsUpdated",
    });

    const lambda = new NodejsFunction(this, "UpdateDeviceLocationsOnMapLambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      // memorySize: 512,
      // timeout: Duration.minutes(1),
      entry: (path.join(__dirname, "../../../src/lambda/map/map-marker-showing-device-location.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, "../../../../../package-lock.json")),
      environment: {
        DEVICE_LOCATIONS_UPDATED_TOPIC_ARN: outputEventTopic.topicArn,
        DEVICE_LOCATIONS_UPDATED_TOPIC_NAME: outputEventTopic.topicName,
      },
      initialPolicy: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [`arn:aws:sns:us-east-1:346761569124:${outputEventTopic.topicName}`],
          actions: ["sns:Publish"],
        }),
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: ["arn:aws:iot:us-east-1:346761569124:thing/*"],
          actions: [
            "iot:DescribeThing",
            "iot:UpdateThing",
          ],
        })
      ]
    });

    new TopicRule(this, "DeviceGpsReceivedTopicRule", {
      // topicRuleName: "UpdateMapWithDeviceTopicRule",
      description: "Longitude and latitude coordinates of a device, to update the map with a marker",
      sql: IotSql.fromStringAsVer20160323("SELECT topic(3) AS deviceId, lo AS longitude, la AS latitude FROM 'dt/map/+'"),
      actions: [new LambdaFunctionAction(lambda)]
    });

    // To send message to frontend i.e. publish to WebSocketToWebClientRoute's queue
    new SnsToSqs(this, "SnsToSqs", {
      // encryptionKeyProps: { alias: `${outputEventTopic.topicName}SnsToSqsEncryptionKeyAlias` },
      existingTopicObj: outputEventTopic,
      existingQueueObj: api.webSocket.webSocketToWebClientRouteQueue
    });

    new CfnOutput(this, "CfnOutput", {
      value: `${outputEventTopic.topicName}`,
    });
  }
}

module.exports = { MapMarkerShowingDeviceLocation };