const { Stack } = require("aws-cdk-lib");
const { SignUp } = require("./workflow/sign-up.js");
const { ConfirmSignUp } = require("./workflow/confirm-sign-up.js");
const { SignIn } = require("./workflow/sign-in.js");

class AccountStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'AccountStack'");

    const {
      consumerUserPoolClientId
    } = props;


    /*** Backend Workflows ***/




    /*** Frontend Workflows ***/

    this.signUp = new SignUp(this, "SignUp", {
      consumerUserPoolClientId,
    });

    this.confirmSignUp = new ConfirmSignUp(this, "ConfirmSignUp", {
      consumerUserPoolClientId,
    });

    this.signIn = new SignIn(this, "SignIn", {
      consumerUserPoolClientId,
    });
  }
}

module.exports = { AccountStack };