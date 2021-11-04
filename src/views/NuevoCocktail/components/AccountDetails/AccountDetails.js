import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { DropzoneDialog } from 'material-ui-dropzone';
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

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { nodeModuleNameResolver } from 'typescript';

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
          const consulta = await clienteAxios.get(`/cocteles/uno/${id}`);
          setValues(consulta.data.coctel);
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

  const categorias = [ 'Bebidas', 'Cócteles', 'Refrescos', 'Cervezas', 'Sidras', 'Destilados' ];

  const categorias2 = [
    [
      'Con gas', 'Sin gas'
    ],
    [
      'Aperitivos', 'Frescos', 'Vínicos', 'Clásicos', 'Intensos', 'Para 2', 'Para después de comer'
    ],
    [
      'Mócteles', 'Kombuchas', 'Gaseosas Botánicas', 'Tés Helados', 'Mates Fríos', 'Tónicas Botánicas'
    ],
    [
      'Vodka', 'Tequila', 'Mezcal', 'Ron', 'Gin', 'Ginebra', 'Grapa', 'Pisco', 'Orujo', 'Cognac', 'Whisky', 'Whiskey', 'Bitter', 'Vermouth', 'Aguardiente de peras', 'Aguardiente de cerezas', 'Licor de almendras', 'Licor de anís', 'Licor de avellanas', 'Licor de azafrán', 'Licor de café', 'Licor de calafate', 'Licor de cassis', 'Licor de cerezas', 'Licor de chile poblano', 'Licor de endrino', 'Licor de flores de sauco', 'Licor de hierbas', 'Licor de hierbas y miel', 'Licor de mandarina', 'Licor de marula', 'Licor de naranja', 'Licor de Nuez', 'Calvados'
    ]
  ]

  const cristaleria = [
    [
      '2 vasos + Jarra Volf 500','Copa Martini','Copa Martini RIEDEL','Copa Sour RIEDEL','Old Fashioned','Old Fashioned Tallado','RIEDEL','Vaso Bombé','Vaso Julep Coso Fatto','Vaso Malta','Vaso Malta RIEDEL','Vaso Old Fashioned Tallado','Vaso Swizzle Cosso','Fatto'
    ],
    [ 
      'Copa Macaron' ,'High Ball' ,'Vaso + Jarra VOLF 500ml' ,'Vaso Swizzle Coso Fatto'
    ],
    [
      'Botella', 'Tirada'
    ]
  ]

  const origen = [
    'No', 'Bariloche', 'Buenos Aires', 'Rio Negro', 'Rio Negro / Neuquén', 'Valle de Uco, Mendoza', 'Agrelo/Perdriel, LdC, Mendoza',

    'Alemania', 'Angioletto Luxardo', 'Argentina', 'Bélgica', 'Blended Malt Whisky', 'Blended Scotch Whisky', 'Buenos Aires, Argentina', 'Canada', 'Chile', 'Cuba', 'Escocia', 'España', 'Francia', 'Guatemala', 'Highland', 'Holanda', 'Inglaterra', 'Irlanda', 'Island', 'Italia', 'Jamaica', 'Japón', 'Kentucky', 'Lago Puelo, Chubut', 'Mendoza, Argentina', 'México', 'Nicaragua', 'Patagonia, Argentina', 'Perú', 'Polonia', 'Puerto Rico', 'República Dominicana', 'Río Negro, Argentina', 'Rusia', 'Speyside', 'Sudáfrica', 'Suecia', 'Tennessee', 'USA', 'Venezuela'
  ]

  const medidas = [ 250, 355, 500, 750 ]

  const [errores, setErrores] = useState(null);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [values, setValues] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: editando ? '' : 'Bebidas',
    categoria2: '',
    cristaleria: '',
    origen: editando ? '' : 'No',
    medida: editando ? '' : 'No',
    stock: true,
    visible: true,
    en_nombre: '',
    en_descripcion: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
  
    const mensajeSwal = withReactContent(Swal);
    if(editando) {
      // editando
      try {
        const post = await clienteAxios.put(`/cocteles/editar/${idEditando}`, values);
        mensajeSwal.fire({
          title: '¡Excelente!',
          text: `El cóctel fue editado exitosamente`,
          icon: 'success',
          timer: 3000
        }).then(()=> {
          window.location.replace("/cocteles");
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
        const post = await clienteAxios.post('/cocteles', values);
        mensajeSwal.fire({
          title: '¡Excelente!',
          text: `El cóctel fue agregado con éxito`,
          icon: 'success',
          timer: 3000
        }).then(()=> {
          window.location.replace("/agregar-coctel");
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
        window.location.replace("/cocteles");
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
          categoria: editando ? '' : 'Bebidas',
          categoria2: '',
          cristaleria: '',
          origen: editando ? '' : 'No',
          medida: editando ? '' : 'No',
          stock: true,
          visible: true,
          en_nombre: '',
          en_descripcion: ''
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
          title="NUEVO CÓCTEL/BEBIDA "
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
              xs={12}
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
              xs={12}
            >
              <TextField
                fullWidth
                helperText="En español"
                label="Descripción"
                margin="dense"
                name="descripcion"
                onChange={handleChange}
                required
                value={values.descripcion}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              lg={2}
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
                <option value={null} disabled selected>- Seleccionar una -</option>
                {
                  categorias.map(opc => (
                    <option key={opc} value={opc}>{opc}</option>
                  ))
                }
              </TextField>
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="Sub-Categoría"
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
                <option value={null} disabled selected>- Seleccionar una -</option>
                {
                  (values.categoria === 'Bebidas') ? (
                    categorias2[0].map(opc => (
                      <option key={opc} value={opc}>{opc}</option>
                    ))
                  ) : (values.categoria === 'Cócteles') ? (
                    categorias2[1].map(opc => (
                      <option key={opc} value={opc}>{opc}</option>
                    ))
                  ) : (values.categoria === 'Refrescos') ? (
                    categorias2[2].map(opc => (
                      <option key={opc} value={opc}>{opc}</option>
                    ))
                  ) : (values.categoria === 'Destilados') ? (
                    categorias2[3].map(opc => (
                      <option key={opc} value={opc}>{opc}</option>
                    ))
                  ) : null
                }
              </TextField>
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
              md={3}
              lg={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="Cristalería"
                margin="dense"
                name="cristaleria"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.cristaleria}
                variant="outlined"
              >
                <option value={0}>- No aplica -</option>
                {
                  (values.categoria === 'Cócteles') ? (
                    cristaleria[0].map(opc => (
                      <option key={opc} value={opc}>{opc}</option>
                    ))
                  ) : (values.categoria === 'Refrescos') ? (
                    cristaleria[1].map(opc => (
                      <option key={opc} value={opc}>{opc}</option>
                    ))
                  ) : (values.categoria === 'Cervezas' || values.categoria === 'Sidras') ? (
                    cristaleria[2].map(opc => (
                      <option key={opc} value={opc}>{opc}</option>
                    ))
                  ) : null
                }
              </TextField>
            </Grid>
            <Grid
              item
              md={3}
              lg={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="Origen"
                margin="dense"
                name="origen"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.origen}
                variant="outlined"
              >
                {
                  origen.map(opc => (
                    <option key={opc} value={opc}>{opc}</option>
                  ))
                }
              </TextField>
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="Medida"
                margin="dense"
                name="medida"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.medida}
                variant="outlined"
              >
                <option value={'No'} selected>No</option>
                {
                  medidas.map(opc => (
                    <option key={opc} value={opc}>{`${opc}ml`}</option>
                  ))
                }
              </TextField>
            </Grid>
          </Grid>
          
          <CardHeader
            subheader="Traducción al inglés"
          />
          <Grid
            container
            spacing={3}
          >
            <Grid
                item
                md={4}
                xs={12}
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
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="En inglés"
                  label="Descripción"
                  margin="dense"
                  name="en_descripcion"
                  onChange={handleChange}
                  required
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
