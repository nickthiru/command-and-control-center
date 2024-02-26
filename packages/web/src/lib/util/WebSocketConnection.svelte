<script>
  import { onDestroy } from "svelte";
  import { CdkStackApiStackWebSocketStackCA37355C as webSocketStack } from "../../../../cdk/outputs.json";

  let webSocket = new WebSocket(webSocketStack.DevStageWebSocketApiEndpoint);

  webSocket.addEventListener("open", () => {
    console.log("WebSocket is connected");
  });

  webSocket.addEventListener("error", (error) => {
    console.log("WebSocket error: " + error);
  });

  webSocket.addEventListener("message", (event) => {
    // console.log("(+) message: " + JSON.stringify(event.data, null, 2));
    console.log("(+) message: " + event.data);
  });

  webSocket.addEventListener("close", (event) => {
    // webSocket.close();
    console.log("WebSocket is closed: " + event.reason);
  });

  onDestroy(() => {
    webSocket.close();
  });
</script>