const { Stack } = require("aws-cdk-lib");
const { MapMarkerShowingDeviceLocation } = require("./workflow/map-marker-showing-device-location");


class MapStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'MapStack'");

    const {
      api,
    } = props;


    new MapMarkerShowingDeviceLocation(this, "MapMarkerShowingDeviceLocation", {
      api,
    })
  }
}

module.exports = { MapStack };