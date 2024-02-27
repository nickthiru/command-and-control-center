const { Stack } = require("aws-cdk-lib");


class DeviceApiEndpointsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'DeviceMgmtApiEndpointsStack'");

    const {
      restApi,
      // optionsWithAuth,
      optionsWithCors,
      deviceMgmtStack,
    } = props;


    // device-mgmt
    const deviceMgmt = restApi.root.addResource("device-mgmt", optionsWithCors);

    // device-mgmt/thing-type
    const thingType = deviceMgmt.addResource("thing-type");
    thingType.addMethod("POST", deviceMgmtStack.createThingType.lambdaIntegration);
    // thingType.addMethod("POST", deviceMgmtStack.createThingType.lambdaIntegration, optionsWithAuth);
    // thingType.addMethod("GET", deviceMgmtStack.getThingType.lambdaIntegration, optionsWithAuth);
    // thingType.addMethod("DELETE", deviceMgmtStack.deleteThingType.lambdaIntegration, optionsWithAuth);
    // thingType.addMethod("PUT", deviceMgmtStack.updateThingType.lambdaIntegration, optionsWithAuth);

    // device-mgmt/thing-group
    // const thingGroup = deviceMgmt.addResource("thing-group");
    // thingGroup.addMethod("POST", deviceMgmtStack.createThingGroup.lambdaIntegration, optionsWithAuth);

    // device-mgmt/thing
    // const thing = deviceMgmt.addResource("thing");
    // thing.addMethod("POST", deviceMgmtStack.createThing.lambdaIntegration, optionsWithAuth);
  }
}

module.exports = { DeviceApiEndpointsStack };