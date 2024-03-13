// const { handler } = require("./lambda/map/map-marker-showing-device-location.js");
// const event = require("../test/workflow-event-data/map/workflow/update-map-with-device-workflow-event.json");

const { handler } = require("./lambda/map/map-marker-showing-device-location/get-devices.js");


const main = async () => {

  const response = await handler({}, {});

  // console.log("(+) response: " + JSON.stringify(response, null, 2));
}

main();