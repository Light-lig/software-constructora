import React, { useRef, useEffect, useState } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import mapboxgl from "mapbox-gl";
import "./style.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoibGlnaHQtbGlnIiwiYSI6ImNrb29uM2tlMzBiMGwyeG8wZzVtdms0aTYifQ.nfJIZAijYNOopZrFAYr18Q";

export default function Mapa() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new mapboxgl.FullscreenControl({container: mapContainer}));
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return (
    <Card >
    <CardContent>

      <div ref={mapContainer} className="map-container" />
      </CardContent>
   </Card>

  );
}
