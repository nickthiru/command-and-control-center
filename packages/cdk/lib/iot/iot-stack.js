const { Stack } = require("aws-cdk-lib");
const { TopicRuleStack } = require("./rule/topic-rule-stack");


class IotStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'IotStack'");

    const {
      lambda,
    } = props;


    this.topicRule = new TopicRuleStack(this, "TopicRuleStack", {
      lambda,
    });
  }
}

module.exports = { IotStack };