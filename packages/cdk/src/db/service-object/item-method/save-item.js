const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");


module.exports = async function saveItem(ddbClient, tableName, dataToSave) {
  console.log("\n");
  console.log("(+) Inside 'saveItem()'");
  console.log("(+) tableName: " + tableName);
  console.log("(+) dataToSave: \n" + JSON.stringify(dataToSave, null, 2));

  try {
    console.log("(+) Saving to DDB...");

    const result = await ddbClient.send(new PutItemCommand({
      TableName: tableName,
      Item: marshall(dataToSave),
    }));

    console.log("(+) result: \n" + JSON.stringify(result, null, 2));

    return {
      statusCode: 201,
      message: "Item successfully saved in DDB"
    };

  } catch (error) {
    console.log("(-) Error: " + error);
  };
}