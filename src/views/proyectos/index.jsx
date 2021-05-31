import {React, useState, useEffect} from "react";
import { Container, Grid } from "@material-ui/core";
import Mapa from '../../components/mapa';
import Tabla from '../../components/tabla';
import { useUser } from '../../store/UserProvider';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';


const Proyectos = () => {
const [proyectos, setProyectos] = useState(null);
const { state } = useUser();
const [mapa, setMapa] = useState({});

useEffect(async ()=>{
  var token = {
    username: state.username,
    password: state.password
  }
  await axios.get("http://localhost:8080/proyecto/all", { auth: token}).then(function(response){
    response.data.map((proyecto, index) =>{
      proyecto.id = index;
      proyecto.cliente = {};
    })
    setProyectos(response.data);
  }).catch(function(error){
    console.log(error);
  })
},[]);
  return(
  <Container>
    <Grid item xs={12}>
      {
      (proyectos !== null)?<Mapa proyectos={proyectos} getMapa={(mapa) => {setMapa(mapa)}}/>:<CircularProgress size={40}/>
      }
    </Grid>
    <Grid item xs={12}>
    {
      (proyectos !== null)?<Tabla proyectos={proyectos} mapa={mapa}/>:<CircularProgress size={40}/>
    }
    </Grid>
  </Container>
)
};

export default Proyectos;
