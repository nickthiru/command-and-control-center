<script>

  import { CdkStackMapStackMapMarkerShowingDeviceLocationD8CD2916 as MapStackMapMarkerShowingDeviceLocation } from "../../../../cdk/outputs.json";
  // import { mapGeoJsonStore } from "../../../src/store/map-geojson-store";

  console.log("(+) Inside 'MapPage.svelte'");

  export let pubsub;
  export let db;

  let eventTopic = MapStackMapMarkerShowingDeviceLocation.IotHandlerConstructCfnOutputDADD8568;
  console.log("(+) eventTopic: " + eventTopic);

  function subscriberWithDb(db) {
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

  let subFn = subscriberWithDb(db)

  pubsub.subscribe(eventTopic, subFn);

</script>

MapPage