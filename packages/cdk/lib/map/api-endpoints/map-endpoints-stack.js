const { Stack } = require("aws-cdk-lib");
const { LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");


class MapEndpointsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'MapEndpointsStack'");

    const {
      api,
      mapMarkerShowingDeviceLocation,
    } = props;


    // /map
    const map = api.http.restApi.root.addResource("map", api.http.optionsWithCors);

    // /map/devices
    const devices = map.addResource("devices");

    devices.addMethod("GET", new LambdaIntegration(mapMarkerShowingDeviceLocation.getDevices.lambda));

    // const devices = map.addResource("devices");
    // devices.addMethod("GET", new LambdaIntegration( mapMarkerShowingDeviceLocation.getDevices.lambda), api.http.optionsWithAuth);
  }
}

module.exports = { MapEndpointsStack };