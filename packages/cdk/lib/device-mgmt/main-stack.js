const { Stack } = require("aws-cdk-lib");
const { CreateThingType } = require("./workflow/create-thing-type");


class DeviceMgmtStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'DeviceMgmtStack'");

    // const {
    //   consumerUserPoolClientId
    // } = props;


    /*** Backend Workflows ***/




    /*** Frontend Workflows ***/

    this.createThingType = new CreateThingType(this, "CreateThingType");
  }
}

module.exports = { DeviceMgmtStack };