const { Stack } = require("aws-cdk-lib");
const { Table, AttributeType } = require("aws-cdk-lib/aws-dynamodb");

class DataStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'DataStack'");

    // this.app_Table = new Table(this, "App_Table", {
    //   partitionKey: {
    //     name: "PK",
    //     type: AttributeType.STRING
    //   },
    //   sortKey: {
    //     name: "SK",
    //     type: AttributeType.STRING
    //   }
    // });


    // DDB table to store WebSocket connections. This table needs to be set/accessed
    // in the 'ConnectRoute_WebsocketLambda' (line 20).
    this.webSocketConnectionsTable = new Table(this, "WebSocketConnectionsTable", {
      tableName: "WebSocketConnectionsTable",
      partitionKey: {
        name: "connectionId",
        type: AttributeType.STRING
      },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST
    });
  };
}

module.exports = { DataStack };