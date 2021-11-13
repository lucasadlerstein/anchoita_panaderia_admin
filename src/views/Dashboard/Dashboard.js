import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import clienteAxios from '../../config/axios';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  ComprasDash,
  Reutilizable,
  CategoriasCafe
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  aboutTalleres: {
    fontFamily: 'Roboto' 
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [estadisticas, setEstadisticas] = useState({});

  useEffect(() => {
    const traerDatos = async () => {
      const estadisticasDB = await clienteAxios.get('/general/estadisticas');
      setEstadisticas(estadisticasDB.data);
      console.log(estadisticasDB)
    }
    traerDatos();
  //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}
      // style={{marginLeft: '20%', width: '100%', marginTop: '7.1rem'}}
      // style={{alignItems: 'center'}}
    >
      <Grid
        container
        spacing={4}
        style={{alignItems: 'center', justifyContent: 'center', marginTop: '6rem'}}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget inscriptosNewsletter={estadisticas.totalComida}
            onClick={() => window.location.href = '/comida'}
            style={{cursor: 'pointer'}}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress eventosTotales={estadisticas.totalBebida}
            onClick={() => window.location.href = '/bebidas'}
            style={{cursor: 'pointer'}}
          />
        </Grid>

      </Grid>
        <Grid
          container
          spacing={4}
          style={{marginTop: '20px', alignItems: 'center', justifyContent: 'center'}}
        >
          {/* <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit totalCharlasVisibles={estadisticas.totalOcultos} />
          </Grid> */}
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Reutilizable
            texto={"COMIDAS OCULTAS"}
            numero={estadisticas.totalComidaOcultos}
            onClick={() => window.location.href = '/comida-oculta'}
            style={{cursor: 'pointer'}}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Reutilizable
            texto={"BEBIDAS OCULTAS"}
            numero={estadisticas.totalBebidaOcultos}
            onClick={() => window.location.href = '/bebida-oculta'}
            style={{cursor: 'pointer'}}
          />
        </Grid>
        </Grid>

        <Grid
          container
          spacing={4}
          style={{marginTop: '20px', alignItems: 'center', justifyContent: 'center'}}
        >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <CategoriasCafe
            texto={"CATEGORIAS CAFÉ"}
            numero={estadisticas.totalCategoriasCafe}
            onClick={() => window.location.href = '/categorias-cafe'}
            style={{cursor: 'pointer'}}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
