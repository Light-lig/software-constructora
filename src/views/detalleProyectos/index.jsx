import {React, useEffect, useState} from "react";
import { Container, Grid } from "@material-ui/core";
import Mapa from '../../components/mapa';
import Lista from '../../components/lista';
import Chart from '../../components/graficos/lineas';
import { useUser } from '../../store/UserProvider';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const data = new Array(19).fill(0).reduce((prev, curr) => [...prev, {
  x: prev.slice(-1)[0].x + 1,
  y: prev.slice(-1)[0].y * (0.9 + Math.random() * 0.2)
}], [{x: 0, y: 10}]);
const DetalleProyectos = (props) => {

const [proyectos, setProyectos] = useState([]);
const { state } = useUser();

  useEffect(async ()=>{
    var token = {
      username: state.username,
      password: state.password
    }
    await axios.get("http://localhost:8080/proyecto/all", { auth: token}).then(function(response){

      setProyectos(response.data.filter(p => p.idProyecto == props.match.params.id));
      console.log(response.data.filter(p => p.idProyecto == props.match.params.id))
    }).catch(function(error){
      console.log(error);
    })
  },[]);

return (
  <Container>
    <Grid container spacing={3}>
      <Grid item xs={6} md={6} sm={12}>
{
      (proyectos.length > 0)?<Mapa proyectos={proyectos}/>:<CircularProgress size={40}/>
    }
      </Grid>
      <Grid item xs={6} md={6} sm={12}>
{
  (proyectos.length > 0)?        <Lista proyecto={proyectos[0]}/>:<CircularProgress size={40}/>
}
      </Grid>

  </Grid>
  </Container>
)
};

export default DetalleProyectos;
