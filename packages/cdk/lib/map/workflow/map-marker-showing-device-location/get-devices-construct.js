const { Construct } = require("constructs");
const { CfnOutput } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
// const { Duration } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
// const { LambdaFunctionAction } = require("@aws-cdk/aws-iot-actions-alpha");
// const { TopicRule, IotSql } = require("@aws-cdk/aws-iot-alpha");
// const { Topic } = require("aws-cdk-lib/aws-sns");
// const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const path = require("path");


class GetDevicesContruct extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'GetDevicesContruct'");

    // const {
    //   api,
    // } = props;


    this.lambda = new NodejsFunction(this, "UpdateDeviceLocationsOnMapLambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      // memorySize: 512,
      // timeout: Duration.minutes(1),
      entry: (path.join(__dirname, "../../../../src/lambda/map/map-marker-showing-device-location/get-devices.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, "../../../../../../package-lock.json")),
      environment: {
        // DEVICE_LOCATIONS_UPDATED_TOPIC_ARN: outputEventTopic.topicArn,
        // DEVICE_LOCATIONS_UPDATED_TOPIC_NAME: outputEventTopic.topicName,
      },
      initialPolicy: [
        // new PolicyStatement({
        //   effect: Effect.ALLOW,
        //   resources: [`arn:aws:sns:us-east-1:654654543926:${outputEventTopic.topicName}`],
        //   actions: ["sns:Publish"],
        // }),
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: "*",
          actions: [
            "iot:ListThings",
          ],
        })
      ]
    });
  }
}

module.exports = { GetDevicesContruct };