import { React , useState, useContext} from "react";
import { Card, CardContent, Button, TextField, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Usuario from "../../images/Usuario.png";
import axios from 'axios';
import Redireccionar from '../redireccionar';
import Alert from '../alert';
import Loader from '../loader';
import { useUser } from '../../store/UserProvider';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
    usuario: {
      width: "200px",
      margin: "0px",
    },
  })
);
const Login = () => {
  const { dispatch } = useUser();
  //declarando los estados
  const classes = useStyles();
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [textoErrorUsuario, setTextoErrorUsuario] = useState("");
  const [textoErrorContrasenia, setTextoErrorContrasenia] = useState("");
  const [isValidUsuario, setIsValidUsuario] =  useState(false);
  const [isValidContrasenia, setIsValidContrasenia] =  useState(false);
  const [isValid, setIsValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");
  const [openLoader, setOpenLoader] = useState(false);

  const handleLogin = () =>{
    setOpenLoader(true);
    if(validacionUsuario(usuario) && validacionContrasenia(contrasenia)){
      var token = {
        username: usuario,
        password:contrasenia
      }
       axios.get("http://localhost:8080/usuario/all",{ auth:token }).then(function (response){
         setOpenLoader(false);
          if(response.status === 200){
            dispatch({type:"UPDATE_USER",item:token});
            setTipo("success");
            setOpen(true);
            setMensaje("Bienvenido.");
            setIsValid(true);
          }else{
            setTipo("error");
            setOpen(true);
            setMensaje("Ocurrio un error inesperado.");
          }

       }).catch(error => {
         setOpenLoader(false);
         setTipo("warning");
         setOpen(true);
         setMensaje("Usuario no encontrado.");
    })
    }else{
      setOpenLoader(false);
      setTipo("warning");
      setOpen(true);
      setMensaje("El usuario y la constrasenia son requeridos.");
    }
    setIsValid(false);
  }

  const handleChageUsuario = (e) => {
        setUsuario(e.target.value);
        validacionUsuario(e.target.value);

  }
  const validacionUsuario = (valor) =>{
    if(valor !== ""){

    setTextoErrorUsuario("");
    setIsValidUsuario(false);
    return true;
    }else{
      setTextoErrorUsuario("El usuario es obligatorio.");
      setIsValidUsuario(true);
      return false
    }
  }
  const validacionContrasenia = (valor) =>{
    if(valor !== ""){
      setTextoErrorContrasenia("");
      setIsValidContrasenia(false);
      return true;
        }else{
          setTextoErrorContrasenia("La contrasenia es obligatoria.");
          setIsValidContrasenia(true);
          return false;
        }
  }
  const handleChageContrasenia = (e) => {
  setContrasenia(e.target.value);
  validacionContrasenia(e.target.value);
  }



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs>
            <img src={Usuario} className={classes.usuario} />
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs sm={12} md></Grid>
          <Grid item xs={8} sm={12} md={8}>
            <form className={classes.root} noValidate autoComplete="off">

              <TextField
                error={isValidUsuario}
                name="usuario"
                id="usuario"
                label="Usuario"
                fullWidth
                value={usuario}
                variant="outlined"
                helperText={textoErrorUsuario}
                onChange={(e) => handleChageUsuario(e)}
              />
              <TextField
                error={isValidContrasenia}
                id="contrasenia"
                type="password"
                label="Clave"
                value={contrasenia}
                name="constrasenia"
                fullWidth
                variant="outlined"
                helperText={textoErrorContrasenia}
                onChange={ (e) => handleChageContrasenia(e)}
              />
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Button variant="contained" color="primary" size="large" onClick={handleLogin}>
                  Entrar
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid item xs sm={12} md></Grid>
        </Grid>
        <Loader open={openLoader} />
      </CardContent>
      <Alert open={open} mensaje={mensaje} cerrar={handleClose} tipo={tipo}/>
      <Redireccionar url="/proyectos" estado={isValid}/>
    </Card>
  );
};

export default Login;
