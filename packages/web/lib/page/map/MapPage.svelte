<script>

  // import { CdkStackMapStackMapMarkerShowingDeviceLocationD8CD2916 as MapStackMapMarkerShowingDeviceLocation } from "../../../../cdk/outputs.json";

  import { onMount, onDestroy } from "svelte";
  import { Map } from "maplibre-gl";
  // import { mapGeoJsonStore } from "../../../src/store/map-geojson-store";
  import "../../../../../node_modules/maplibre-gl/dist/maplibre-gl.css";

  console.log("(+) Inside 'MapPage.svelte'");

  let map;
  let mapContainer;
  let mapDeviceLocations;

  const API_KEY = "3eGcbxE8u0EOARx5ukQX"

  onMount(() => {

    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

    map = new Map({
      container: mapContainer,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`, // style URL
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
  });

  onDestroy(() => {
    map.remove();
  });

</script>

<div class="map-wrap">
  <a href="https://www.maptiler.com" class="watermark"><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/></a>
  <div class="map" bind:this={mapContainer}></div>
</div>

<style>
  .map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 77px); /* calculate height of the screen minus the heading */
  }

  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .watermark {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 999;
  }
</style>