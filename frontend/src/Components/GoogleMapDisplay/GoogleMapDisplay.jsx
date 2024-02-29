import React from "react";
import "./GoogleMapDisplay.css";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

export const GoogleMapDisplay = (props) => {
  const { service_center } = props;
  const containerStyle = {
    width: "100%",
    height: "600px",
    borderRadius: "0 0 50px 50px",
  };

  const center = {
    lat: Number(service_center.location.latitude),
    lng: Number(service_center.location.longitude),
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY", // Update GMap Key here
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};
