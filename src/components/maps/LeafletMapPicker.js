import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function LeafletMapPicker({
  latitude = 17.385,
  longitude = 78.4867,
  onLocationSelect,
}) {
  const html = `
<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8"/>

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"/>

<link
rel="stylesheet"
href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

<style>

html,
body,
#map{
height:100%;
margin:0;
padding:0;
}

</style>

</head>

<body>

<div id="map"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>

const map=L.map("map").setView(
[${latitude},${longitude}],
13
);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
attribution:'OpenStreetMap'
}
).addTo(map);

let marker=L.marker(
[${latitude},${longitude}]
).addTo(map);

map.on("click",function(e){

const lat=e.latlng.lat;
const lng=e.latlng.lng;

marker.setLatLng([lat,lng]);

window.ReactNativeWebView.postMessage(
JSON.stringify({
lat,
lng
})
);

});

</script>

</body>
</html>
`;

  return (
    <View
      style={{
        height: 350,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);

          onLocationSelect?.(data);
        }}
      />
    </View>
  );
}