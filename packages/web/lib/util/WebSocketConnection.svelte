<!--
  the websocket connection gets closed on its own. how to reconnect when this happens?
 -->

<script>
  import { onMount, onDestroy } from "svelte";
  import { CdkStackApiStackWebSocketStackCA37355C as ApiStackWebSocketStack } from "../../../cdk/outputs.json";

  console.log("(+) Inside 'WebSocketConnection.svelte'");

  export let pubsub;

  let webSocket;

  onMount(() => {
    webSocket = new WebSocket(ApiStackWebSocketStack.DevStageWebSocketApiEndpoint);

    webSocket.addEventListener("open", () => {
      console.log("WebSocket is connected");
    });
  
    webSocket.addEventListener("error", (error) => {
      console.log("WebSocket error: " + JSON.stringify(error, null, 2));
    });
  
    webSocket.addEventListener("message", (event) => {
      let ed = JSON.parse(event.data);

      pubsub.queue(ed.event, ed.data);
    });
  
    webSocket.addEventListener("close", (event) => {
      // webSocket.close();
      console.log("WebSocket is closed: " + event.reason);
    });
  });

  onDestroy(() => {
    webSocket.close();
  });
</script>