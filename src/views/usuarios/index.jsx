import React,{useState,forwardRef, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import { Container, Grid } from "@material-ui/core";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useUser } from '../../store/UserProvider';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const Usuarios = () =>{
  const { state } = useUser();
  useEffect(async ()=>{
    var token = {
      username: state.username,
      password: state.password
    }
    await axios.get("http://localhost:8080/usuario/all", { auth: token}).then(function(response){

      setData(response.data);
    }).catch(function(error){
      console.log(error);
    })
  },[]);

const [data, setData] = useState([]);
  return(<Container>
<Grid>
<Typography variant="h3" component="h2" gutterBottom>
Usuarios      </Typography>
<MaterialTable
   title="Lista de usuarios"
data={data}
columns={[
        {title: "id", field:"id", editable:'never'},
        { title: 'Nombre', field: 'usuario',  validate: rowData => Boolean(rowData.usuario), },
        { title: 'role', field: 'role', validate: rowData => Boolean(rowData.role), editComponent:(props) => {
          return (<Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          onChange={(event)=>{
            props.onChange(event.target.value);
          }}
        >
          <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
          <MenuItem value={"READER"}>READER</MenuItem>
          <MenuItem value={"GESTOR_PROYECTOS"}>GESTOR_PROYECTOS</MenuItem>
          <MenuItem value={"AUDITOR"}>AUDITOR</MenuItem>
        </Select>)
      },
      render:(RowData)=>{
        return(<Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={RowData.role} >
          <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
          <MenuItem value={"READER"}>READER</MenuItem>
          <MenuItem value={"GESTOR_PROYECTOS"}>GESTOR_PROYECTOS</MenuItem>
          <MenuItem value={"AUDITOR"}>AUDITOR</MenuItem>
        </Select>)
      }
    },
          { title: 'Clave', field: 'clave' },

      ]}
icons={tableIcons}
editable={{

    onRowAdd: newData =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
              var long = data.length - 1;
              var id = data[long].id + 1;
              newData.id = id;
              newData.clave = "";
              setData([...data, newData]);

              var token = {
                username: state.username,
                password: state.password
              }
              var datos = {
                usuario:newData.usuario,
                clave:newData.clave,
                role:newData.role
              }
              axios({url:"http://localhost:8080/usuario/create",method: 'post',  data:datos , auth:token }).then(function (response){
                console.log(response);
                  resolve();
              }).catch(error => {
                console.log(error);
           })

            }, 1000);
        }),
    onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                dataUpdate[index].clave = "";
                setData([...dataUpdate]);
                var token = {
                  username: state.username,
                  password: state.password
                }
                var datos = {
                  id:oldData.id,
                  usuario:oldData.usuario,
                    clave:newData.clave,
                  role:oldData.role
                }
                console.log(datos);
                axios({ url:"http://localhost:8080/usuario/update", method:'post', auth:token, data:datos }).then(function (response){
                  console.log(response);
                    resolve();
                }).catch(error => {
                  console.log(error);
             });

            }, 1000);
        }),
    onRowDelete: oldData =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                var token = {
                  username: state.username,
                  password: state.password
                }
                console.log(oldData.id);
                axios({ url:`http://localhost:8080/usuario/delete?id=${oldData.id}`, auth:token,  method:'get' }).then(function (response){
                  console.log(response);
                    resolve();
                }).catch(error => {
                  console.log(error);
             });

            }, 1000);
        })
}}
/>
</Grid>
    </Container>);
}
export default Usuarios;
