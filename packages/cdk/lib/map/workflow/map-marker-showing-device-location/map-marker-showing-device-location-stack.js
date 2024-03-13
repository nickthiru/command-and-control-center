const { Stack, CfnOutput } = require("aws-cdk-lib");
// const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
// const { Runtime } = require("aws-cdk-lib/aws-lambda");
// // const { Duration } = require("aws-cdk-lib");
// const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
// const { LambdaFunctionAction } = require("@aws-cdk/aws-iot-actions-alpha");
// const { TopicRule, IotSql } = require("@aws-cdk/aws-iot-alpha");
// const { Topic } = require("aws-cdk-lib/aws-sns");
// const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
// const path = require("path");
const { IotHandlerConstruct } = require("./iot-handler-construct");
const { GetDevicesContruct } = require("./get-devices-construct");


class MapMarkerShowingDeviceLocationStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'MapMarkerShowingDeviceLocation'");

    const {
      api,
    } = props;


    new IotHandlerConstruct(this, "IotHandlerConstruct", {
      api,
    });

    this.getDevices = new GetDevicesContruct(this, "GetDevicesContruct", {
      //
    })
  }
}

module.exports = { MapMarkerShowingDeviceLocationStack };