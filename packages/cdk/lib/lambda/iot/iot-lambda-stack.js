const { Stack } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
// const { Duration } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { LambdaToSqs } = require("@aws-solutions-constructs/aws-lambda-sqs");
const path = require("path");


class IotLambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'MapLambdaStack'");

    // const {
    //   apiStack,
    //   iotStack,
    // } = props;


    this.processDeviceGpsFromIot = new NodejsFunction(this, "UpdateDeviceLocationsOnMapLambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      // memorySize: 512,
      // timeout: Duration.minutes(1),
      entry: (path.join(__dirname, "../../../src/map/workflow/update-map-with-device-workflow-service.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, "../../../../../package-lock.json")),
      environment: {
        // WEBSOCKET_TO_WEB_CLIENT_ROUTE_QUEUE_URL: apiStack.websocketStack.webSocketToWebClientRouteQueue.queueUrl,
        DEVICE_GPS_DATA_RECEIVED_TOPIC_ARN: deviceGpsDataReceivedTopic.topicArn,
        DEVICE_GPS_DATA_RECEIVED_TOPIC_NAME: deviceGpsDataReceivedTopic.topicName,
      },
      initialPolicy: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [`arn:aws:sqs:us-east-1:346761569124:${apiStack.websocketStack.webSocketToWebClientRouteQueue.queueName}`],
          actions: ["sqs:SendMessage"],
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
  }
}

module.exports = { IotLambdaStack };