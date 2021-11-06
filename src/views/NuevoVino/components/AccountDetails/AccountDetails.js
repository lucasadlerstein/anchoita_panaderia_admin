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

    async function cargarDatosEditar() {
      try {
        const wino = await clienteAxios.get(`/general/get/categorias-cafe`);
        const categoriasCafe = wino.data.categoriasCafe;
        console.log(categoriasCafe);
        const objetoMio = {
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
        }
        categoriasCafe.map((elemento)  => {
          switch(Number(elemento.id)) {
            case 1:
              objetoMio.nombre01 = elemento.nombre;
              objetoMio.en_nombre01 = elemento.en_nombre

            break;


            case 2:
              objetoMio.nombre02 = elemento.nombre;
              objetoMio.en_nombre02 = elemento.en_nombre

            break;

            case 3:
              objetoMio.nombre03 = elemento.nombre;
              objetoMio.en_nombre03 = elemento.en_nombre
            break;

            case 4:
              objetoMio.nombre04 = elemento.nombre;
              objetoMio.en_nombre04 = elemento.en_nombre
            break;

            case 5:
              objetoMio.nombre05 = elemento.nombre;
              objetoMio.en_nombre05 = elemento.en_nombre

            break;

            case 6:
              objetoMio.nombre06 = elemento.nombre;
              objetoMio.en_nombre06 = elemento.en_nombre
            break;

            case 7:
              objetoMio.nombre07 = elemento.nombre;
              objetoMio.en_nombre07 = elemento.en_nombre
            break;

            case 8:
              objetoMio.nombre08 = elemento.nombre;
              objetoMio.en_nombre08 = elemento.en_nombre
            break;

            case 9:
              objetoMio.nombre09 = elemento.nombre;
              objetoMio.en_nombre09 = elemento.en_nombre
            break;

            case 10:
              objetoMio.nombre10 = elemento.nombre;
              objetoMio.en_nombre10 = elemento.en_nombre;
            break;
            default:
              break;
          }
        })
        console.log(objetoMio)
        setValues(objetoMio);
        // setValues(wino.data.categoiasCafe);
      } catch (error) {
        console.log(error);
      }
    }
    cargarDatosEditar();
    // eslint-disable-next-line
  }, [])

  const [errores, setErrores] = useState(null);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [values, setValues] = useState({})
  // const [values, setValues] = useState({
  //   nombre01: '',
  //   en_nombre01: '',
  //   nombre02: '',
  //   en_nombre02: '',
  //   nombre03: '',
  //   en_nombre03: '',
  //   nombre04: '',
  //   en_nombre04: '',
  //   nombre05: '',
  //   en_nombre05: '',
  //   nombre06: '',
  //   en_nombre06: '',
  //   nombre07: '',
  //   en_nombre07: '',
  //   nombre08: '',
  //   en_nombre08: '',
  //   nombre09: '',
  //   en_nombre09: '',
  //   nombre10: '',
  //   en_nombre10: ''
  // });

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
  const diezItems = ['01','02','03','04','05','06','07','08','09','10'];

  async function guardarCategoria(numero, es, en) {
    const mensajeSwal = withReactContent(Swal);
    const info = {
      nombre: '',
      en_nombre: ''
    };
    
    switch(Number(numero)) {
      case 1:
        info.nombre = values.nombre01;
        info.en_nombre = values.en_nombre01;
      break;
      case 2:
        info.nombre = values.nombre02;
        info.en_nombre = values.en_nombre02;
      break;
      case 3:
        info.nombre = values.nombre03;
        info.en_nombre = values.en_nombre03;
      break;

      case 4:
        info.nombre = values.nombre04;
        info.en_nombre = values.en_nombre04;
      break;

      case 5:
        info.nombre = values.nombre05;
        info.en_nombre = values.en_nombre05;
      break;

      case 6:
        info.nombre = values.nombre06;
        info.en_nombre = values.en_nombre06;
      break;

      case 7:
        info.nombre = values.nombre07;
        info.en_nombre = values.en_nombre07;
      break;

      case 8:
        info.nombre = values.nombre08;
        info.en_nombre = values.en_nombre08;
      break;

      case 9:
        info.nombre = values.nombre09;
        info.en_nombre = values.en_nombre09;
      break;

      case 10:
        info.nombre = values.nombre10;
        info.en_nombre = values.en_nombre10;
      break;
      default:
        break;
    }
    console.log(info);
    await clienteAxios.put(`/general/actualizar/categorias-cafe/${numero}`, info)
      .then(resp => {
        mensajeSwal.fire({
          title: 'Excelente',
          text: `Categoría actualizada con éxito`,
          icon: 'success',
          timer: 3000
        });
      })
      .catch(error => {
        mensajeSwal.fire({
          title: 'Ups...',
          text: `Hubo un error`,
          icon: 'error',
          timer: 3000
        });
      })
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
        <CardHeader
          subheader="Categorías de Café"
        />
          
            {
              diezItems.map(uno => (
                <Grid
                  key={uno}
                  container
                  spacing={3}
                >
                  <Grid  item md={2} xs={3}>
                    <CardHeader
                      title={`Café ${uno}`}
                    />
                  </Grid>
                  <Grid item md={4} xs={5}>
                    <TextField
                      fullWidth
                      helperText={`Nombre del Café #${uno} en español`}
                      // label="Nombre del café"
                      margin="dense"
                      name={`nombre${uno}`}
                      onChange={handleChange}
                      required
                      value={values.[`nombre${uno}`]}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={4} xs={4}>
                    <TextField
                      fullWidth
                      helperText={`Nombre del Café #${uno} en inglés`}
                      margin="dense"
                      name={`en_nombre${uno}`}
                      onChange={handleChange}
                      required
                      value={values.[`en_nombre${uno}`]}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => guardarCategoria(uno, `nombre${uno}`, `en_nombre${uno}`)}
                      style={{marginTop: '8px'}}
                    >
                    Guardar</Button>
                  </Grid>
                </Grid>

              ))
            }
        </CardContent>
        <Divider />
        <CardActions>
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
