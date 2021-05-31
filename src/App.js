import { React } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/nav";
import Rutas from "./views/Rutas";

const App = () => {

  return (

      <Router>
        <Nav />
        <Rutas />
      </Router>
  );
};

export default App;
