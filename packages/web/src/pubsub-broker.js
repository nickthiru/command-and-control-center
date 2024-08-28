import PubSub from "pubsub-js";
import Queue from "queue";

const queue = new Queue({
  autostart: true,
  results: [],
});

export default function PubSubBroker() {
  console.log("(+) Inside 'PubSubBroker()'");

  return {
    queue: (topic, data) => {
      console.log("(+) Inside 'PubSubBroker.queue()'");
      console.log("(+) topic: " + topic);
      console.log("(+) data: " + JSON.stringify(data));

      queue.push((cb) => {
        PubSub.publish(topic, data);
        cb(null, topic);
      });
    },
    subscribe: (topic, subFn) => {
      console.log("(+) Inside 'PubSubBroker.subscribe()'");
      console.log("(+) topic: " + topic);
      console.log("(+) subFn: " + subFn.toString());

      PubSub.subscribe(topic, subFn);
    },
    unsubscribe: (token) => {
      PubSub.unsubscribe(token);
    },
  }
}
