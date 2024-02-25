const { Stack } = require("aws-cdk-lib");
const { UpdateMapWithDeviceWorkflowConstruct } = require("./workflow/update-map-with-device-workflow-construct");


class MapStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'DeviceMgmtStack'");

    const {
      apiStack,
      // policyStack,
    } = props;


    /*** Backend Workflows ***/

    new UpdateMapWithDeviceWorkflowConstruct(this, "UpdateMapWithDeviceWorkflowConstruct", {
      apiStack,
    });
  }
}

module.exports = { MapStack };