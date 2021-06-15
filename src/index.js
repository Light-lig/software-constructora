import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';
import {UserProvider} from './store/UserProvider'

const AppConstructora = () =>{

  return(
        <UserProvider >
            <App/>
        </UserProvider>
  )
}


ReactDOM.render(

    <AppConstructora />
,
  document.getElementById('root')
);
