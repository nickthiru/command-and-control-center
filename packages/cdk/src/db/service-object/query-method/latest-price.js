const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

// API
module.exports = async function latestPrice(ddbClient, tableName) {
  console.log("(+) Inside 'latestPrice()'");
  console.log("(+) tableName: " + tableName);

  const siteNames = ["Live Chennai", "Thangamayil", "Bhima"];
  // const siteNames = ["Live Chennai"];


  try {
    console.log("(+) Getting from DyDB...");

    const data = [];

    const responses = siteNames.map(async (siteName) => {
      console.log("(+) siteName: " + siteName);

      const response = await ddbClient.send(new QueryCommand({
        // TableName: "BackendStackDataStackE94D765A-WebsiteTableF4B2AB07-1EOQBSA0HXWT8",
        TableName: tableName,
        KeyConditionExpression: "#PK = :PK",
        ProjectionExpression: "#siteName, #uiDateTime, #goldPrice",
        ExpressionAttributeNames: {
          "#PK": "PK",
          "#siteName": "siteName",
          "#uiDateTime": "uiDateTime",
          "#goldPrice": "goldPrice",
        },
        ExpressionAttributeValues: {
          ":PK": `WEBSITE#${siteName}`,
        },
        ScanIndexForward: false,
        Limit: 1,
      }));

      console.log("(+) response: \n" + JSON.stringify(response, null, 2));

      console.log("(+) response['Items'][0]: \n" + JSON.stringify(response["Items"][0], null, 2));

      return response["Items"][0];
    });

    for await (let response of responses) {
      data.push(response);
    }

    return data;

  } catch (error) {
    console.log("(-) Error: " + error);
  };
}