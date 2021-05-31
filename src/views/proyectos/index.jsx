import React from "react";
import { Container, Grid } from "@material-ui/core";
import Mapa from '../../components/mapa';
import Tabla from '../../components/tabla';
const Proyectos = () => (
  <Container>
    <Grid item xs={12}>
      <Mapa />
    </Grid>
    <Grid item xs={12}>
    <Tabla />
    </Grid>
  </Container>
);

export default Proyectos;
