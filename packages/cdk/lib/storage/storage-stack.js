const { Stack, RemovalPolicy } = require("aws-cdk-lib");
const { Table, AttributeType, BillingMode } = require("aws-cdk-lib/aws-dynamodb");

class StorageStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'StorageStack'");

    this.mainTable = new Table(this, "MainTable", {
      partitionKey: {
        name: "PK",
        type: AttributeType.STRING
      },
      sortKey: {
        name: "SK",
        type: AttributeType.STRING
      },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
  };
}

module.exports = { StorageStack };