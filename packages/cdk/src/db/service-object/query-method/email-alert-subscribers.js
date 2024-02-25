const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

// API
module.exports = async function emailAlertSubscribers(ddbClient, tableName) {
  console.log("(+) Inside 'emailAlertSubscribers'");
  console.log("(+) tableName: " + tableName);


  try {
    console.log("(+) Getting from DyDB...");

    const response = await ddbClient.send(new QueryCommand({
      // TableName: "BackendStackDataStackE94D765A-WebsiteTableF4B2AB07-1EOQBSA0HXWT8",
      TableName: tableName,
      KeyConditionExpression: "#PK = :PK",
      ProjectionExpression: "#emailAddress",
      ExpressionAttributeNames: {
        "#PK": "PK",
        "#emailAddress": "emailAddress"
      },
      ExpressionAttributeValues: {
        ":PK": "EMAIL_ALERT",
      },
    }));

    console.log("(+) response: \n" + JSON.stringify(response, null, 2));

    return response["Items"];





    // const data = [];

    // const responses = websites.map(async (website) => {
    //   console.log("(+) website: " + website);

    //   const response = await ddbClient.send(new QueryCommand({
    //     // TableName: "BackendStackDataStackE94D765A-WebsiteTableF4B2AB07-1EOQBSA0HXWT8",
    //     TableName: tableName,
    //     KeyConditionExpression: "#PK = :emailAddress",
    //     ProjectionExpression: "#emailAddress",
    //     ExpressionAttributeNames: {
    //       "#PK": "PK",
    //       "#uiDateTime": "uiDateTime",
    //       "#goldPrice": "goldPrice",
    //     },
    //     ExpressionAttributeValues: {
    //       ":emailAddress": `EMAIL_ALERT#${emailAddress}`,
    //     },
    //     ScanIndexForward: false,
    //     Limit: 1,
    //   }));

    //   console.log("(+) response: \n" + JSON.stringify(response, null, 2));

    //   console.log("(+) response['Items'][0]: \n" + JSON.stringify(response["Items"][0], null, 2));

    //   return response["Items"][0];
    // });

    // for await (let response of responses) {
    //   data.push(response);
    // }

    // return data;

  } catch (error) {
    console.log("(-) Error: " + error);
  };
}