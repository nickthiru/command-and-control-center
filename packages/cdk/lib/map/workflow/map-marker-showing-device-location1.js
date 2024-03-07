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


    const topic = new Topic(this, "DeviceGpsReceivedTopic", {
      topicName: "DeviceGpsReceived",
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
        DEVICE_GPS_RECEIVED_TOPIC_ARN: topic.topicArn,
        DEVICE_GPS_RECEIVED_TOPIC_NAME: topic.topicName,
      },
      initialPolicy: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [`arn:aws:sns:us-east-1:346761569124:${topic.topicName}`],
          actions: ["sns:Publish"],
        }),
      ]
    });
    // updateDeviceLocationOnMap.addToRolePolicy(new PolicyStatement({
    //   effect: Effect.ALLOW,
    //   resources: [`arn:aws:sqs:us-east-1:346761569124:${apiStack.websocketStack.webSocketToWebClientRouteQueue.queueName}`],
    //   actions: ["sqs:SendMessage"],
    // }));

    // new LambdaToSqs(this, "LambdaToSqs", {
    //   existingLambdaObj: lambda,
    //   existingQueueObj: apiStack.websocketStack.webSocketToWebClientRouteQueue,
    // });

    // Trigger Event
    //  iotStack.deviceMapDataReceivedTopicRule.addAction(new LambdaFunctionAction(lambda));

    new TopicRule(this, "DeviceGpsReceivedTopicRule", {
      // topicRuleName: "UpdateMapWithDeviceTopicRule",
      description: "Longitude and latitude coordinates of a device, to update the map with a marker",
      sql: IotSql.fromStringAsVer20160323("SELECT topic(3) AS deviceId, lo AS longitude, la AS latitude FROM 'dt/map/+'"),
      actions: [new LambdaFunctionAction(lambda)]
    });

    // To send message to frontend i.e. publish to WebSocketToWebClientRoute's queue
    new SnsToSqs(this, "SnsToSqs", {
      // encryptionKeyProps: { alias: `${outputEventTopic.topicName}SnsToSqsEncryptionKeyAlias` },
      existingTopicObj: topic,
      existingQueueObj: api.webSocket.webSocketToWebClientRouteQueue
    });

    // To use in frontend to create PubSub topic
    // new CfnOutput(this, `${topic.topicName}CfnOutput`, {
    //   value: `${topic.topicName}`,
    //   exportName: `${topic.topicName}`
    // });

    new CfnOutput(this, "CfnOutput", {
      value: `${topic.topicName}`,
      // exportName: `${topic.topicName}`
    });
  }
}

module.exports = { MapMarkerShowingDeviceLocation };