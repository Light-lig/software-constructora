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
import {Link} from 'react-router-dom';
import './styles.css';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
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
  list: {
  width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { state,dispatch } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchor, setAnchor] = React.useState('left');
  const [estado, setEstado] = React.useState({
     top: false,
     left: false,
     bottom: false,
     right: false,
   });

   const handleMenu = (event) => {
     setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
     setAnchorEl(null);
   };
   const cerrarSesion = () =>{
     dispatch({type:"UPDATE_USER",item:{}});
   }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setEstado({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"

    >
      <List>
        {['usuarios','proyectos'].map((text, index) => (
        <Link to={`/${text}`} className="links text-color">  <ListItem button key={text}>
            <ListItemIcon><GroupAddIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          </Link>
        ))}
      </List>
      <Divider />

    </div>
  );
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            <Link to="/proyectos" className="links">    Software Constructora    </Link>
          </Typography>

          {(Object.keys(state).length > 0) ? (
                     <>
                       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"  onClick={toggleDrawer(anchor, true)}>
                         <MenuIcon />
                       </IconButton>
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
                     </>
                   ):''}
        </Toolbar>
      </AppBar>
      <Redireccionar url="/" estado={(Object.keys(state).length === 0)}/>

       <Drawer anchor={anchor} open={estado[anchor]} onClose={toggleDrawer(anchor, false)}>
         {list(anchor)}
       </Drawer>
    </div>
  );
}
