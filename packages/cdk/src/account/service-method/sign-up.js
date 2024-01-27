module.exports = async function signUp(
  cognitoClient,
  SignUpCommand,
  consumerUserPoolClientId,
  username,
  password,
  emailAddress,
) {

  try {
    const signUpResponse = await cognitoClient.send(new SignUpCommand({
      ClientId: consumerUserPoolClientId,
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: emailAddress,
        },
      ],
    }));

    // const signUpResponse = { // SignUpResponse
    //   UserConfirmed: true, // required
    //   CodeDeliveryDetails: { // CodeDeliveryDetailsType
    //     Destination: "STRING_VALUE",
    //     DeliveryMedium: "EMAIL",
    //     AttributeName: "STRING_VALUE",
    //   },
    //   UserSub: "STRING_VALUE", // required
    // };
    console.log("(+) signUpResponse: " + JSON.stringify(signUpResponse, null, 2));

    return signUpResponse;

  } catch (error) {
    console.log(error);
  }
}