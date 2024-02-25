const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

module.exports = async function latestPriceDateTime(ddbClient, tableName, siteName) {
  console.log("\n");
  console.log("(+) Inside 'latestPriceDateTime()'");
  // console.log("(+) tableName: " + tableName);

  try {
    console.log("(+) Getting from DyDB...");

    const response = await ddbClient.send(new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "#PK = :PK",
      ProjectionExpression: "#goldPrice, #siteDateTime",
      ExpressionAttributeNames: {
        "#PK": "PK",
        "#goldPrice": "goldPrice",
        "#siteDateTime": "siteDateTime"
      },
      ExpressionAttributeValues: {
        ":PK": `WEBSITE#${siteName}`,
      },
      ScanIndexForward: false,
      Limit: 1,
    }));

    console.log("(+) response: \n" + JSON.stringify(response, null, 2));
    // console.log("(+) typeof response: \n" + typeof response);

    console.log("(+) response['Items'][0]: \n" + JSON.stringify(response["Items"][0], null, 2));

    const item = response["Items"][0];

    if (item === undefined) {
      return {
        goldPrice: undefined,
        siteDateTime: undefined,
      }
    }

    return {
      goldPrice: item.goldPrice,
      siteDateTime: item.siteDateTime,
    };

  } catch (error) {
    console.log("(-) Error: " + error);
  };
}