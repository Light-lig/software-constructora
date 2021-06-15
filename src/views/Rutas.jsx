import React from "react";
import Login from './login';
import { Route, Switch, Redirect } from "react-router-dom";
import Proyectos from './proyectos';
import DetalleProyectos from './detalleProyectos';
import Usuarios from './usuarios';
const Rutas = props => {
  return(
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/proyectos" exact component={Proyectos}/>
      <Route path="/detalle-proyectos/:id" exact component={DetalleProyectos} />
      <Route path='/usuarios' exact component={Usuarios} />
    </Switch>
  );
}

export default Rutas;
