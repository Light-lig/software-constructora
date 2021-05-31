import React from "react";
import { Container, Grid } from "@material-ui/core";
import Mapa from '../../components/mapa';
import Lista from '../../components/lista';
import Chart from '../../components/graficos/lineas';
const data = new Array(19).fill(0).reduce((prev, curr) => [...prev, {
  x: prev.slice(-1)[0].x + 1,
  y: prev.slice(-1)[0].y * (0.9 + Math.random() * 0.2)
}], [{x: 0, y: 10}]);
const DetalleProyectos = () => (
  <Container>
    <Grid container spacing={3}>
      <Grid item xs={6} md={6} sm={12}>
        <Mapa />
      </Grid>
      <Grid item xs={6} md={6} sm={12}>
        <Lista />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
        <Chart data={data}/>
            <Chart data={data}/>
                <Chart data={data}/>
                  </Grid>
      </Grid>
  </Grid>
  </Container>
);

export default DetalleProyectos;
