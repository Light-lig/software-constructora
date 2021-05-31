import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LoginComponent from '../../components/login';
const useStyles = makeStyles({
  contenedor_login:{
   marginTop:20
 }
});
const Login = () => {
const classes = useStyles();
   return(
     <Container maxWidth="sm" className={classes.contenedor_login}>
       <Grid item md={12}>
        <LoginComponent />
        </Grid>
     </Container>
    )
}


export default Login;
