<script>

  import { CdkStackMapStackMapMarkerShowingDeviceLocationD8CD2916 as MapStackMapMarkerShowingDeviceLocation } from "../../../../cdk/outputs.json";
  import { mapGeoJsonStore } from "../../../src/store/map-geojson-store";

  console.log("(+) Inside 'MapPage.svelte'");

  export let pubsub;
  export let db;

  let eventTopic = MapStackMapMarkerShowingDeviceLocation.CfnOutput;
  console.log("(+) eventTopic: " + eventTopic);

  function test(db) {
    return function(eventTopic, data) {
      console.log("(+) I am subscribed to eventTopic: " + eventTopic);
      console.log("(+) This is my data: " + JSON.stringify(data));
    
      db.deviceLocations.put({
        deviceId: data.deviceId,
        longitude: data.longitude,
        latitude: data.latitude,
      });
    }
  }

  let something = test(db)

  pubsub.subscribe(eventTopic, something);

</script>

MapPage