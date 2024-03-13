const { Stack } = require("aws-cdk-lib");
const { MapMarkerShowingDeviceLocationStack } = require("./workflow/map-marker-showing-device-location/map-marker-showing-device-location-stack");
const { MapEndpointsStack } = require("./api-endpoints/map-endpoints-stack");


class MapStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'MapStack'");

    const {
      api,
    } = props;


    const mapMarkerShowingDeviceLocation = new MapMarkerShowingDeviceLocationStack(this, "MapMarkerShowingDeviceLocation", {
      api,
    });

    new MapEndpointsStack(this, "MapEndpointsStack", {
      api,
      mapMarkerShowingDeviceLocation,
    });
  }
}

module.exports = { MapStack };