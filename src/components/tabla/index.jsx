import {React, useState} from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import IconButton from '@material-ui/core/IconButton';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import Button from '@material-ui/core/Button';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import Redireccionar from '../redireccionar';


export default function ToolbarGrid(props) {
const cols =  [{ field: 'idProyecto',width:150,resizable: true },
               { field: 'nombre',width: 150,resizable: true },
               {field:'porcentajeAvance',width: 150,resizable: true},
               {field:'inicio',width: 150,resizable: true},
               {field:'fin',width: 150,resizable: true},
               {field:'tipoProyecto',width: 150,resizable: true},
               {field:'estadoAvance',width: 150,resizable: true},
               {field:'volar',headerName: 'volar',width:150, renderCell:(params)=>(
                         <IconButton
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={()=>{
                  props.mapa.flyTo({
                        center:[parseFloat(params.row.longitud),parseFloat(params.row.latitud)],
                        essential: true,
                        zoom:15.99
                    })
                }}
              >
                <AirplanemodeActiveIcon />
      </IconButton>
    )},{field:'Seleccionar',headerName: 'Seleccionar',width:150, renderCell:(params)=>(
                   <IconButton
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={()=>{
            setIdProyectoSelected(params.row.idProyecto)
            setEstado(true,()=>{
              setEstado(false)
            })
          }}
        >
          <TouchAppIcon />
</IconButton>
)}]
const [idProyectoSelected, setIdProyectoSelected] = useState(0);
const [estado, setEstado] = useState(false);

  return (
    <div style={{ height: 400, width: '100%', backgroundColor:'white' }}>
      <DataGrid
        rows={props.proyectos}
        columns={cols}
        components={{
          Toolbar: GridToolbar,
        }}

      />
      <Redireccionar url={`/detalle-proyectos/${idProyectoSelected}`} estado={estado} />
    </div>
  );
}
