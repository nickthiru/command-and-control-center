const { Construct } = require("constructs");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
// const { Duration } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { TopicRule, IotSql } = require("@aws-cdk/aws-iot-alpha");
const { LambdaFunctionAction } = require("@aws-cdk/aws-iot-actions-alpha");
const { LambdaToSqs } = require("@aws-solutions-constructs/aws-lambda-sqs");
const path = require("path");


class UpdateMapWithDeviceWorkflowConstruct extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'CreateThingType' construct");

    const {
      apiStack,
    } = props;


    const lambda = new NodejsFunction(this, "Lambda", {
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
        WEBSOCKET_TO_WEB_CLIENT_ROUTE_QUEUE_URL: apiStack.websocketStack.webSocketToWebClientRouteQueue.queueUrl,
      },
    });

    lambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [`arn:aws:sqs:us-east-1:346761569124:${apiStack.websocketStack.webSocketToWebClientRouteQueue.queueName}`],
      actions: ["sqs:SendMessage"],
    }));

    new TopicRule(this, "TopicRule", {
      topicRuleName: "UpdateMapWithDeviceTopicRule",
      description: "When device sends GPS coordinates as payload, update the map with a marker representing the device",
      sql: IotSql.fromStringAsVer20160323("SELECT topic(3) AS deviceId, lo AS longitude, la AS latitude FROM 'dt/map/+'"),
      actions: [new LambdaFunctionAction(lambda)],
    });

    new LambdaToSqs(this, "LambdaToSqs", {
      existingLambdaObj: lambda,
      existingQueueObj: apiStack.websocketStack.webSocketToWebClientRouteQueue,
    });
  }
}

module.exports = { UpdateMapWithDeviceWorkflowConstruct };