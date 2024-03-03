<script>

  import { CdkStackMapStackMapMarkerShowingDeviceLocationD8CD2916 as MapStackMapMarkerShowingDeviceLocation } from "../../../../../cdk/outputs.json";

  export let pubsub;

  let eventTopic = MapStackMapMarkerShowingDeviceLocation.CfnOutput;
  console.log("(+) eventTopic.CfnOutput: " + eventTopic);


  pubsub.subscribe(eventTopic, (eventTopic, data) => {
    console.log("(+) I am subscribed to eventTopic: " + eventTopic);
    console.log("(+) This is my data: " + JSON.stringify(data));
  });

</script>

MapPage