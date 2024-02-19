// const { handler } = require("./account/workflow/sign-up.js");
// const event = require("../test/test-data/account/workflow/lambda-event/sign-up.json");

// const { handler } = require("./account/workflow/confirm-sign-up.js");
// const event = require("../test/test-data/account/workflow/lambda-event/confirm-sign-up.json");

// const { handler } = require("./account/workflow/sign-in.js");
// const event = require("../test/test-data/account/workflow/lambda-event/sign-in.json");

const { handler } = require("./device-mgmt/workflow/create-thing-type.js");
const event = require("../test/test-data/device-mgmt/workflow/lambda-event/create-thing-type.json");


const main = async () => {
  // const res = await handler({});
  // console.log("(+) res: \n" + JSON.stringify(res, null, 2));
  // console.log("(+) body: " + res.body);

  const response = await handler(event, {});

  console.log("(+) response: " + JSON.stringify(response, null, 2));
}

main();