module.exports = async function createThingType(
  iotClient,
  CreateThingTypeCommand,
  thingTypeName,
  thingTypeDescription
) {

  try {
    const createThingTypeResponse = await iotClient.send(new CreateThingTypeCommand({
      thingTypeName,
      thingTypeProperties: {
        thingTypeDescription,
      },
    }));

    console.log("(+) signUpResponse: " + JSON.stringify(createThingTypeResponse, null, 2));

    return createThingTypeResponse;

  } catch (error) {
    console.log(error);
  }
}

