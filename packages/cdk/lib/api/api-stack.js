const { Stack } = require("aws-cdk-lib");
// const { HttpStack } = require("./http/http-stack");
const { WebSocketStack } = require("./websocket/websocket-stack");

class ApiStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'ApiStack'");

    const {
      // dataStack,
      // authStack,
      // accountStack,
      deviceMgmtStack,
    } = props;


    // new HttpStack(this, "HttpStack", {
    //   // authStack,
    //   // accountMgmtStack,
    //   deviceMgmtStack,
    // });

    new WebSocketStack(this, "WebSocketStack", {
      // dataStack,
    })



  }
}

module.exports = { ApiStack };