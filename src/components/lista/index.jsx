import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ApartmentIcon from '@material-ui/icons/Apartment';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import CardContent from "@material-ui/core/CardContent";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Card from "@material-ui/core/Card";
import Battery20Icon from '@material-ui/icons/Battery20';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import EventIcon from '@material-ui/icons/Event';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export default function NestedList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card>
      <CardContent>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Informacion del proyecto
            </ListSubheader>
          }
          className={classes.root}
        >
          <ListItem button>
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary={props.proyecto.nombre} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={props.proyecto.tipoProyecto} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Battery20Icon />
            </ListItemIcon>
            <ListItemText primary={'%' + props.proyecto.porcentajeAvance} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <StarHalfIcon />
            </ListItemIcon>
            <ListItemText primary={props.proyecto.estadoAvance} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={props.proyecto.inicio} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={props.proyecto.fin} />
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Informacion del ciente" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={props.proyecto.cliente.nombre} />
            </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={props.proyecto.cliente.telefono} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={props.proyecto.cliente.nit} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={props.proyecto.cliente.correo} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={props.proyecto.cliente.direccion} />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </CardContent>
    </Card>
  );
}
NestedList.defaultProps = {
  proyecto: {},
};
