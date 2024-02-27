const { Stack } = require("aws-cdk-lib");
const { HttpStack } = require("./http/http-stack");
const { WebSocketStack } = require("./websocket/websocket-stack");

class ApiStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'ApiStack'");

    const {
      dataStack,
      // authStack,
      lambdaStack,
    } = props;


    this.httpStack = new HttpStack(this, "HttpStack", {
      // authStack,
      lambdaStack,
    });

    this.websocketStack = new WebSocketStack(this, "WebSocketStack", {
      dataStack,
      // authStack,
    })



  }
}

module.exports = { ApiStack };