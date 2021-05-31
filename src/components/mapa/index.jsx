import React, { useRef, useEffect, useState } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import mapboxgl from "mapbox-gl";
import "./style.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoibGlnaHQtbGlnIiwiYSI6ImNrb29uM2tlMzBiMGwyeG8wZzVtdms0aTYifQ.nfJIZAijYNOopZrFAYr18Q";

export default function Mapa(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-89.3575);
  const [lat, setLat] = useState(13.807932);
  const [zoom, setZoom] = useState(9);
  const [proyectos, setProyectos] = useState(props.proyectos);
  useEffect(() => {
    if (map.current) return;
     // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(
      new mapboxgl.FullscreenControl({ container: mapContainer })
    );
    props.getMapa(map.current);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.on("load", () => {
      map.current.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.current.addImage("custom-marker", image);
          var arrayFeatures = [];
          proyectos.map(proyecto => {
            arrayFeatures.push(  {
                // feature for Mapbox DC
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [proyecto.longitud, proyecto.latitud],
                },
                properties: {
                  title: proyecto.nombre + ' %' + proyecto.porcentajeAvance,
                },
              })
          })
          map.current.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: arrayFeatures,
            },
          });

          // Add a symbol layer
          map.current.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            }, paint: {
              "text-color": "white"
            }
          });
        }
      );
    });
  });
  return (
    <Card>
      <CardContent>
        <div ref={mapContainer} className="map-container" />
      </CardContent>
    </Card>
  );
}
Mapa.defaultProps = {
  getMapa: (mapa) =>{},
  proyectos:[]
}
