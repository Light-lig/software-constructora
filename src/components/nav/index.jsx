import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useUser } from '../../store/UserProvider';
import Redireccionar from '../redireccionar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    pa:0
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { state,dispatch } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


   const handleMenu = (event) => {
     setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
     setAnchorEl(null);
   };
   const cerrarSesion = () =>{
     dispatch({type:"UPDATE_USER",item:{}});
   }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            Software Constructora
          </Typography>
          {(Object.keys(state).length > 0) ? (
                     <div>
                       <IconButton
                         aria-label="account of current user"
                         aria-controls="menu-appbar"
                         aria-haspopup="true"
                         onClick={handleMenu}
                         color="inherit"
                       >
                         <AccountCircle />
                       </IconButton>
                       <Menu
                         id="menu-appbar"
                         anchorEl={anchorEl}
                         anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                         }}
                         keepMounted
                         transformOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                         }}
                         open={open}
                         onClose={handleClose}
                       >
                         <MenuItem>{state.username}</MenuItem>
                         <MenuItem onClick={cerrarSesion}>Log out</MenuItem>
                       </Menu>
                     </div>
                   ):''}
        </Toolbar>
      </AppBar>
      <Redireccionar url="/" estado={(Object.keys(state).length === 0)}/>
    </div>
  );
}
