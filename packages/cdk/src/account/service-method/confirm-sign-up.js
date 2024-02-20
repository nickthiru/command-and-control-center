module.exports = async function confirmSignUp(
  cognitoClient,
  ConfirmSignUpCommand,
  consumerUserPoolClientId,
  username,
  confirmationCode,
) {

  try {
    const confirmSignUpResponse = await cognitoClient.send(new ConfirmSignUpCommand({
      ClientId: consumerUserPoolClientId,
      Username: username,
      ConfirmationCode: confirmationCode,
    }));

    console.log("(+) confirmSignUpResponse: " + JSON.stringify(confirmSignUpResponse, null, 2));

    return confirmSignUpResponse;

  } catch (error) {
    console.log(error);
  }
}


/*
Errors

CodeMismatchException: Invalid verification code provided, please try again.
    at de_CodeMismatchExceptionRes (C:\Users\nickt\Projects\movie-review-app\node_modules\@aws-sdk\client-cognito-identity-provider\dist-cjs\protocols\Aws_json1_1.js:6257:23)
    at de_ConfirmSignUpCommandError (C:\Users\nickt\Projects\movie-review-app\node_modules\@aws-sdk\client-cognito-identity-provider\dist-cjs\protocols\Aws_json1_1.js:2485:25)
    at process.processTicksAndRejections (c:\Users\nickt\Projects\movie-review-app\lib\internal\process\task_queues.js:95:5)
    at async C:\Users\nickt\Projects\movie-review-app\node_modules\@smithy\middleware-serde\dist-cjs\deserializerMiddleware.js:7:24
    at async C:\Users\nickt\Projects\movie-review-app\node_modules\@smithy\middleware-retry\dist-cjs\retryMiddleware.js:31:46
    at async C:\Users\nickt\Projects\movie-review-app\node_modules\@aws-sdk\middleware-logger\dist-cjs\loggerMiddleware.js:7:26
    at async Object.confirmSignUp (c:\Users\nickt\Projects\movie-review-app\packages\cdk\src\account\service-method\confirm-sign-up.js:10:35)
    at async exports.handler (c:\Users\nickt\Projects\movie-review-app\packages\cdk\src\account\workflow\confirm-sign-up.js:23:31)
    at async main (C:\Users\nickt\Projects\movie-review-app\packages\cdk\src\runner.js:16:20) {name: 'CodeMismatchException', $fault: 'client', $metadata: {…}, __type: 'CodeMismatchException', stack: 'CodeMismatchException: Invalid verification c…-review-app\packages\cdk\src\runner.js:16:20)', …}


*/