import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackAlert = (props) =>{
  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.cerrar}>
     <Alert onClose={props.cerrar} severity={props.tipo}>
       { props.mensaje }
     </Alert>
   </Snackbar>
  )
}

SnackAlert.defaultProps = {
  open:false,
  cerrar:()=>{},
  mensaje:"",
  tipo:"success"
}

export default SnackAlert;
