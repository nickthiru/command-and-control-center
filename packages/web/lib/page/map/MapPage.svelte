<script>
  import { onDestroy } from "svelte";

  import { CdkStackMapStackMapMarkerShowingDeviceLocationD8CD2916 as MapStackMapMarkerShowingDeviceLocation } from "../../../../cdk/outputs.json";
  // import { mapGeoJsonStore } from "../../../src/store/map-geojson-store";

  import Api from "../../../src/api-service";

  console.log("(+) Inside 'MapPage.svelte'");

  export let pubsub;

  let eventTopic = MapStackMapMarkerShowingDeviceLocation.IotHandlerConstructCfnOutputDADD8568;
  console.log("(+) eventTopic: " + eventTopic);

  function subscriber(localVar) {
    return function(eventTopic, data) {
      console.log("(+) I am subscribed to eventTopic: " + eventTopic);
      console.log("(+) This is my data: " + JSON.stringify(data));
    
      localVar = eventTopic;
    }
  }

  let localVar;

  let subFn = subscriber(localVar);

  let token = pubsub.subscribe(eventTopic, subFn);

  let mapDevices = (async function fetchMapDevices() {
    const response = await Api.get("/map/devices");
    console.log("(+) response: " + JSON.stringify(response, null, 2));
  })();

  onDestroy(() => {
    pubsub.unsubscribe(token);
  });

</script>

MapPage