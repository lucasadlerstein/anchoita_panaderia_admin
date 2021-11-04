import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clienteAxios from '../../../../config/axios';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
  Input,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  
  const { className, ...rest } = props;
  const classes = useStyles();

  useEffect(() => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if(id !== null) {
      setEditando(true);
      setIdEditando(id);
      async function cargarDatosEditar() {
        try {
          const wino = await clienteAxios.get(`/vinos/uno/${id}`);
          setValues(wino.data.vino);
        } catch (error) {
          console.log(error);
        }
      }
      cargarDatosEditar();
    } else {
      setEditando(false);
    }
    // eslint-disable-next-line
  }, [])

  const [errores, setErrores] = useState(null);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [values, setValues] = useState({
    heladoVaso: '',
    heladoCucurucho: '',
    heladoCuarto: '',
    nombre01: '',
    en_nombre01: '',
    nombre02: '',
    en_nombre02: '',
    nombre03: '',
    en_nombre03: '',
    nombre04: '',
    en_nombre04: '',
    nombre05: '',
    en_nombre05: '',
    nombre06: '',
    en_nombre06: '',
    nombre07: '',
    en_nombre07: '',
    nombre08: '',
    en_nombre08: '',
    nombre09: '',
    en_nombre09: '',
    nombre10: '',
    en_nombre10: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const handleChangeCheckbox = event => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
  
    const mensajeSwal = withReactContent(Swal);
    if(editando) {
      // editando
      try {
        const post = await clienteAxios.put(`/vinos/editar/${idEditando}`, values);
        mensajeSwal.fire({
          title: '¡Excelente!',
          text: `El vino fue editado exitosamente`,
          icon: 'success',
          timer: 3000
        }).then(()=> {
          window.location.replace("/vinos");
        });
      } catch (error) {
        console.log(error);
        mensajeSwal.fire({
          title: 'Ups...',
          text: `Hubo un error`,
          icon: 'error',
          timer: 3000
        });
      }
    } else {
      // creando nuevo
      try {
        const post = await clienteAxios.post('/vinos', values);
        mensajeSwal.fire({
          title: '¡Excelente!',
          text: `El vino fue agregado con éxito`,
          icon: 'success',
          timer: 3000
        }).then(()=> {
          window.location.replace("/agregar-vino");
        });
      } catch (error) {
        console.log(error);
        mensajeSwal.fire({
          title: 'Ups...',
          text: `Hubo un error`,
          icon: 'error',
          timer: 3000
        });
      }
    }
    
  }

  const ConfirmacionSwal = withReactContent(Swal)

  const btnCancelar = () => {
    ConfirmacionSwal.fire({
      title: '¿Seguro querés cancelar?',
      text: `Se perderá toda la información`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0E3453',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro',
      cancelButtonText: 'Quiero seguir'
    }).then( async (result)  => {
      if(result.value){
        window.location.replace("/vinos");
      }
    }); 
  }

  const btnVaciar = () => {
    ConfirmacionSwal.fire({
      title: '¿Seguro querés vaciar los campos?',
      text: `Se perderá toda la información`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0E3453',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, vacialo',
      cancelButtonText: 'Seguir editando'
    }).then( async (result)  => {
      if(result.value){
        setValues({
          heladoVaso: '',
          heladoCucurucho: '',
          heladoCuarto: '',
          nombre01: '',
          en_nombre01: '',
          nombre02: '',
          en_nombre02: '',
          nombre03: '',
          en_nombre03: '',
          nombre04: '',
          en_nombre04: '',
          nombre05: '',
          en_nombre05: '',
          nombre06: '',
          en_nombre06: '',
          nombre07: '',
          en_nombre07: '',
          nombre08: '',
          en_nombre08: '',
          nombre09: '',
          en_nombre09: '',
          nombre10: '',
          en_nombre10: ''
        })
      }
    }); 
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        method="post"
        noValidate
        onSubmit={(e) => enviarFormulario(e)}
      >
        <CardHeader
          title="CAMBIOS GENERALES"
        />
        <CardContent>
        <Divider />
          <CardHeader
            subheader="Precios de helado"
          />
          <Grid
            container
            spacing={3}
          >
            <Grid
                item
                md={3}
                xs={4}
              >
                <TextField
                  fullWidth
                  label="Precio del vasito"
                  margin="dense"
                  name="heladoVaso"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.heladoVaso}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={4}
              >
                <TextField
                  fullWidth
                  label="Precio del cucurucho"
                  margin="dense"
                  name="heladoCucurucho"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.heladoCucurucho}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={4}
              >
                <TextField
                  fullWidth
                  label="Precio del 1/4 kilo"
                  margin="dense"
                  name="heladoCuarto"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.heladoCuarto}
                  variant="outlined"
                />
              </Grid>
            </Grid>
        <Divider style={{marginTop: '20px'}} />
        <CardHeader
          subheader="Categorías de Café"
        />
          <Grid
            container
            spacing={3}
          >
            <Grid item md={2} xs={3}>
              <CardHeader
                title="Café 1"
              />
            </Grid>
            <Grid item md={5} xs={5}>
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del café"
                margin="dense"
                name="nombre01"
                onChange={handleChange}
                required
                value={values.nombre01}
                variant="outlined"
              />
            </Grid>
            <Grid item md={5} xs={4}>
              <TextField
                fullWidth
                helperText="En inglés"
                label="Nombre del café"
                margin="dense"
                name="en_nombre01"
                onChange={handleChange}
                required
                value={values.en_nombre01}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={3}>
              <CardHeader
                title="Café 2"
              />
            </Grid>
            <Grid item md={5} xs={5}>
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del café"
                margin="dense"
                name="nombre02"
                onChange={handleChange}
                required
                value={values.nombre02}
                variant="outlined"
              />
            </Grid>
            <Grid item md={5} xs={4}>
              <TextField
                fullWidth
                helperText="En inglés"
                label="Nombre del café"
                margin="dense"
                name="en_nombre02"
                onChange={handleChange}
                required
                value={values.en_nombre02}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={3}>
              <CardHeader
                title="Café 3"
              />
            </Grid>
            <Grid item md={5} xs={5}>
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del café"
                margin="dense"
                name="nombre03"
                onChange={handleChange}
                required
                value={values.nombre03}
                variant="outlined"
              />
            </Grid>
            <Grid item md={5} xs={4}>
              <TextField
                fullWidth
                helperText="En inglés"
                label="Nombre del café"
                margin="dense"
                name="en_nombre03"
                onChange={handleChange}
                required
                value={values.en_nombre03}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={3}>
              <CardHeader
                title="Café 4"
              />
            </Grid>
            <Grid item md={5} xs={5}>
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del café"
                margin="dense"
                name="nombre04"
                onChange={handleChange}
                required
                value={values.nombre04}
                variant="outlined"
              />
            </Grid>
            <Grid item md={5} xs={4}>
              <TextField
                fullWidth
                helperText="En inglés"
                label="Nombre del café"
                margin="dense"
                name="en_nombre04"
                onChange={handleChange}
                required
                value={values.en_nombre04}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={3}>
              <CardHeader
                title="Café 5"
              />
            </Grid>
            <Grid item md={5} xs={5}>
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del café"
                margin="dense"
                name="nombre05"
                onChange={handleChange}
                required
                value={values.nombre05}
                variant="outlined"
              />
            </Grid>
            <Grid item md={5} xs={4}>
              <TextField
                fullWidth
                helperText="En inglés"
                label="Nombre del café"
                margin="dense"
                name="en_nombre05"
                onChange={handleChange}
                required
                value={values.en_nombre05}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={3}>
              <CardHeader
                title="Café 6"
              />
            </Grid>
            <Grid item md={5} xs={5}>
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del café"
                margin="dense"
                name="nombre06"
                onChange={handleChange}
                required
                value={values.nombre06}
                variant="outlined"
              />
            </Grid>
            <Grid item md={5} xs={4}>
              <TextField
                fullWidth
                helperText="En inglés"
                label="Nombre del café"
                margin="dense"
                name="en_nombre06"
                onChange={handleChange}
                required
                value={values.en_nombre06}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={3}>
              <CardHeader
                title="Café 7"
              />
            </Grid>
            <Grid item md={5} xs={5}>
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del café"
                margin="dense"
                name="nombre07"
                onChange={handleChange}
                required
                value={values.nombre07}
                variant="outlined"
              />
            </Grid>
            <Grid item md={5} xs={4}>
              <TextField
                fullWidth
                helperText="En inglés"
                label="Nombre del café"
                margin="dense"
                name="en_nombre07"
                onChange={handleChange}
                required
                value={values.en_nombre07}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={3}>
              <CardHeader
                title="Café 8"
              />
            </Grid>
            <Grid item md={5} xs={5}>
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del café"
                margin="dense"
                name="nombre08"
                onChange={handleChange}
                required
                value={values.nombre08}
                variant="outlined"
              />
            </Grid>
            <Grid item md={5} xs={4}>
              <TextField
                fullWidth
                helperText="En inglés"
                label="Nombre del café"
                margin="dense"
                name="en_nombre08"
                onChange={handleChange}
                required
                value={values.en_nombre08}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={3}>
              <CardHeader
                title="Café 9"
              />
            </Grid>
            <Grid item md={5} xs={5}>
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del café"
                margin="dense"
                name="nombre09"
                onChange={handleChange}
                required
                value={values.nombre09}
                variant="outlined"
              />
            </Grid>
            <Grid item md={5} xs={4}>
              <TextField
                fullWidth
                helperText="En inglés"
                label="Nombre del café"
                margin="dense"
                name="en_nombre09"
                onChange={handleChange}
                required
                value={values.en_nombre09}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={3}>
              <CardHeader
                title="Café 10"
              />
            </Grid>
            <Grid item md={5} xs={5}>
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del café"
                margin="dense"
                name="nombre10"
                onChange={handleChange}
                required
                value={values.nombre10}
                variant="outlined"
              />
            </Grid>
            <Grid item md={5} xs={4}>
              <TextField
                fullWidth
                helperText="En inglés"
                label="Nombre del café"
                margin="dense"
                name="en_nombre10"
                onChange={handleChange}
                required
                value={values.en_nombre10}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
        <Button
            color="primary"
            variant="contained"
            type="submit"
          >
          { (editando) ? 'Guardar cambios' : 'Crear' }
          </Button>

          <Button
            onClick={() => btnCancelar()}
            style={{backgroundColor: 'red', color: 'white'}}
            variant="contained"
          >Cancelar</Button>

          {
            editando ? null : (
              <Button
                onClick={() => btnVaciar()}
                color="default"
                variant="contained"
                style={{margin: '0 0 0 auto'}}
              >Vaciar campos</Button>
            ) 
          }

          
          {errores ? <Alert severity="error">{errores}</Alert> : null}
        </CardActions>
      </form>
    </Card>

  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
