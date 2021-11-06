import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { DropzoneDialog } from 'material-ui-dropzone';
import clienteAxios from '../../../../config/axios';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
          const consulta = await clienteAxios.get(`/panaderia/uno/${id}`);
          setValues(consulta.data.plato);
        } catch (error) {
          console.log(error);
        }
      }
      cargarDatosEditar();
    } else {
      setEditando(false);
    }

    async function traerCategoriasCafe() {
      await clienteAxios.get('/general/get/categorias-cafe')
        .then(resp => {
          setCategoriasCafe(resp.data.categoriasCafe)
          console.log(resp.data.categoriasCafe)
        })
        .catch(err => {
          console.log(err)
        })
    }
    traerCategoriasCafe()
    // eslint-disable-next-line
  }, [])

  const categorias = [
    { nombre: 'Cafetería', codigo: 1 },
    { nombre: 'Bebidas', codigo: 2 },
    { nombre: 'Panadería', codigo: 3 },
    { nombre: 'Sandwiches', codigo: 4 },
    { nombre: 'Helados', codigo: 5 },
  ]

  const tiposCafe = [
    { nombre: 'Colombia Tolima Honey', codigo: 1 },
    { nombre: 'Mexico Chiapas / Guatemala', codigo: 2 },
    { nombre: 'Guyana Francesa', codigo: 3 }
  ]

  const [errores, setErrores] = useState(null);
  const [editando, setEditando] = useState(false);
  const [categoriasCafe, setCategoriasCafe] = useState([]);
  const [idEditando, setIdEditando] = useState(null);
  const [values, setValues] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    precio2: '',
    precio3: '',
    categoria: 3,
    categoria2: '',
    en_nombre: '',
    en_descripcion: '',
    stock: true,
    visible: true,
  });

  const handleChange = event => {
    if(event.target.name === 'stock') {
      setValues({ ...values, [event.target.name]: event.target.checked });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
  
    const mensajeSwal = withReactContent(Swal);
    if(editando) {
      // editando
      try {
        const post = await clienteAxios.put(`/panaderia/editar/${idEditando}`, values);
        mensajeSwal.fire({
          title: '¡Excelente!',
          text: `El item fue editado exitosamente`,
          icon: 'success',
          timer: 3000
        }).then(()=> {
          window.location.replace("/");
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
        const post = await clienteAxios.post('/panaderia', values);
        mensajeSwal.fire({
          title: '¡Excelente!',
          text: `El item fue agregado con éxito`,
          icon: 'success',
          timer: 3000
        }).then(()=> {
          window.location.replace("/agregar-item");
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
        window.location.replace("/platos");
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
          nombre: '',
          descripcion: '',
          precio: '',
          precio2: '',
          precio3: '',
          categoria: '',
          en_nombre: '',
          en_descripcion: '',
          stock: true,
          visible: true
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
          title="AGREGAR NUEVO"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre"
                margin="dense"
                name="nombre"
                onChange={handleChange}
                required
                value={values.nombre}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                helperText="¿Como es este item?"
                label="Descripción"
                margin="dense"
                name="descripcion"
                onChange={handleChange}
                required
                multiline
                value={values.descripcion}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Categoría"
                margin="dense"
                name="categoria"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.categoria}
                variant="outlined"
              >
                <option value={null} disabled selected>- Seleccionar -</option>
                {
                  categorias.map(cat => (
                    <option key={cat.codigo} value={cat.codigo}>{cat.nombre}</option>
                  ))
                }
              </TextField>
            </Grid>
            <Grid
              item
              md={3}
              xs={6}
            >
                {
                  (Number(values.categoria) === 1) ? (
                    <TextField
                      fullWidth
                      label="Categoría café"
                      margin="dense"
                      name="categoria2"
                      onChange={handleChange}
                      required
                      select
                      // eslint-disable-next-line react/jsx-sort-props
                      SelectProps={{ native: true }}
                      value={values.categoria2}
                      variant="outlined"
                    >
                    <option value={null} disabled selected>- Seleccionar -</option>
                    {
                      categoriasCafe.map(cat => {
                        if(cat.nombre !== null && cat.nombre !== '') {
                          return (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                          )
                        }
                      })
                    }
                  </TextField>
                  ) : null
                }
            </Grid>
            
            <Grid
              item
              lg={2}
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Precio"
                margin="dense"
                name="precio"
                onChange={handleChange}
                required
                type="number"
                value={values.precio}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              lg={2}
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Precio 2"
                margin="dense"
                name="precio2"
                onChange={handleChange}
                required
                type="number"
                value={values.precio2}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              lg={2}
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Precio 3"
                margin="dense"
                name="precio3"
                onChange={handleChange}
                required
                type="number"
                value={values.precio3}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <FormControlLabel
                control={<Checkbox checked={values.stock} onChange={handleChange} name="stock" />}
                label="Stock"
              />
            </Grid>
          </Grid>
          <Divider />
          <CardHeader
            subheader="Traducción al inglés"
          />
          <Grid
            container
            spacing={3}
          >
            <Grid
                item
                md={3}
                xs={6}
              >
                <TextField
                  fullWidth
                  helperText="En inglés"
                  label="Nombre"
                  margin="dense"
                  name="en_nombre"
                  onChange={handleChange}
                  required
                  value={values.en_nombre}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={6}
              >
                <TextField
                  fullWidth
                  helperText="En inglés"
                  label="Descripción"
                  margin="dense"
                  name="en_descripcion"
                  onChange={handleChange}
                  required
                  multiline
                  value={values.en_descripcion}
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

          {/* {errores ? <Alert severity="error">{errores}</Alert> : null} */}
        </CardActions>
      </form>
    </Card>

  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
