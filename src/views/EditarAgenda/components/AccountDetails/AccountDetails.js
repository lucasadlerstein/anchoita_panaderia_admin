import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { DropzoneDialog } from 'material-ui-dropzone';
import clienteAxios from '../../../../config/axios';
import Alert from '@material-ui/lab/Alert';

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

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [openLogo, setOpenLogo] = useState(false);
  
  const [openOrador, setOpenOrador] = useState(false);
  const [openOradorDos, setOpenOradorDos] = useState(false);
  const [openOradorTres, setOpenOradorTres] = useState(false);
  const [openOradorCuatro, setOpenOradorCuatro] = useState(false);

  const [fileObjectsLogo, setFileObjectsLogo] = useState([]);
  const [fileObjectsOrador, setFileObjectsOrador] = useState([]);
  const [fileObjectsOradorDos, setFileObjectsOradorDos] = useState([]);
  const [fileObjectsOradorTres, setFileObjectsOradorTres] = useState([]);
  const [fileObjectsOradorCuatro, setFileObjectsOradorCuatro] = useState([]);

  const [editandoId, setEditandoId] = useState(null);


  const [errores, setErrores] = useState(null);
  const [values, setValues] = useState({
    es_titulo: '',
    slug: '',
    categoria: 1,
    nombre_empresa: '',
    fecha: 1,
    hora: '',
    es_breve_descripcion: '',
    es_larga_descripcion: '',
    duracion: '',
    logo_empresa: '',

    orador_nombre: '',
    orador_apellido: '',
    orador_linkedin: '',
    es_orador_cv: '',
    orador_imagen: '',

    dos_orador_nombre: '',
    dos_orador_apellido: '',
    dos_orador_linkedin: '',
    dos_es_orador_cv: '',
    dos_orador_imagen: '',

    tres_orador_nombre: '',
    tres_orador_apellido: '',
    tres_orador_linkedin: '',
    tres_es_orador_cv: '',
    tres_orador_imagen: '',

    cuatro_orador_nombre: '',
    cuatro_orador_apellido: '',
    cuatro_orador_linkedin: '',
    cuatro_es_orador_cv: '',
    cuatro_orador_imagen: '',

    wpp: '',
    youtube: '',

    zoom_link: '',
    inscriptos: '',
    e_plan: '',
    e_descuento: '',

    en_titulo: '',
    en_breve_descripcion: '',
    en_larga_descripcion: '',
    en_orador_cv: '',
    dos_en_orador_cv: '',
    tres_en_orador_cv: '',
    cuatro_en_orador_cv: '',

    po_titulo: '',
    po_breve_descripcion: '',
    po_larga_descripcion: '',
    po_orador_cv: '',
    dos_po_orador_cv: '',
    tres_po_orador_cv: '',
    cuatro_po_orador_cv: '',

  });

  useEffect(()=> {
    const rellenarCamposEdicion = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      setEditandoId(id);
  
      try{
        const resultado = await clienteAxios.get(`/api/charlas/id/${id}`);
        setValues(resultado.data.resp);
  
        if(resultado.data.status === 'incorrecto'){
          // history.push("/agenda");
        }
      }catch(error){

      } 
    }
    rellenarCamposEdicion();
    // eslint-disable-next-line
  }, []);

  const handleChange = event => {
    if(event.target.name === 'slug') {
      setValues({
        ...values,
        [event.target.name]: ((event.target.value).replace(/\s/g, '-').toLowerCase())
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
  };

  const planes = [
    {
      nombre: 'mastertalk',
      precio: 0
    },
    {
      nombre: 'basico',
      precio: 999
    },
    {
      nombre: 'intermedio',
      precio: 1999
    },
    {
      nombre: 'avanzado',
      precio: 3999
    },
    {
      nombre: 'premium',
      precio: 5999
    },
  ]


  const dias = [
    {
      dia: 1,
      fecha: '23 nov'
    },
    {
      dia: 2,
      fecha: '24 nov'
    },
    {
      dia: 3,
      fecha: '25 nov'
    },
    {
      dia: 4,
      fecha: '26 nov'
    },
    {
      dia: 5,
      fecha: '27 nov'
    },
    {
      dia: 6,
      fecha: '28 nov'
    },
    {
      dia: 7,
      fecha: '29 nov'
    },
    {
      dia: 8,
      fecha: '30 nov'
    },
    {
      dia: 9,
      fecha: '01 dic'
    },
    {
      dia: 10,
      fecha: '02 dic'
    }
  ]

  const onSaveImagenLogo = async () => {
    setOpenLogo(false);

    // Crear formData
    const formDataImagen = new FormData();
    formDataImagen.append('archivo', fileObjectsLogo[0]);

    try {
      const subirImagen = await clienteAxios.post('/api/archivos', formDataImagen);
      setValues(prevState => ({
        ...prevState,
        logo_empresa: subirImagen.data.archivo
      }));
    } catch (error) {
      const mensajeSwal = withReactContent(Swal);
      mensajeSwal.fire({
        title: 'Ups...',
        text: `No pudimos subir la imagen`,
        icon: 'error',
        timer: 3000
      });
    }
  }

  const onSaveImagenOrador = async () => {
    setOpenOrador(false);

    // Crear formData
    const formDataImagen = new FormData();
    formDataImagen.append('archivo', fileObjectsOrador[0]);

    try {
      const subirImagen = await clienteAxios.post('/api/archivos', formDataImagen);
      setValues(prevState => ({
        ...prevState,
        orador_imagen: subirImagen.data.archivo
      }));
    } catch (error) {
      const mensajeSwal = withReactContent(Swal);
      mensajeSwal.fire({
        title: 'Ups...',
        text: `No pudimos subir la imagen`,
        icon: 'error',
        timer: 3000
      });
    }
  }

  const onSaveImagenOradorDos = async () => {
    setOpenOradorDos(false);

    // Crear formData
    const formDataImagen = new FormData();
    formDataImagen.append('archivo', fileObjectsOradorDos[0]);

    try {
      const subirImagen = await clienteAxios.post('/api/archivos', formDataImagen);
      setValues(prevState => ({
        ...prevState,
        dos_orador_imagen: subirImagen.data.archivo
      }));
    } catch (error) {
      const mensajeSwal = withReactContent(Swal);
      mensajeSwal.fire({
        title: 'Ups...',
        text: `No pudimos subir la imagen`,
        icon: 'error',
        timer: 3000
      });
    }
  }

  const onSaveImagenOradorTres = async () => {
    setOpenOradorTres(false);

    // Crear formData
    const formDataImagen = new FormData();
    formDataImagen.append('archivo', fileObjectsOradorTres[0]);

    try {
      const subirImagen = await clienteAxios.post('/api/archivos', formDataImagen);
      setValues(prevState => ({
        ...prevState,
        tres_orador_imagen: subirImagen.data.archivo
      }));
    } catch (error) {
      const mensajeSwal = withReactContent(Swal);
      mensajeSwal.fire({
        title: 'Ups...',
        text: `No pudimos subir la imagen`,
        icon: 'error',
        timer: 3000
      });
    }
  }

  const onSaveImagenOradorCuatro = async () => {
    setOpenOradorCuatro(false);

    // Crear formData
    const formDataImagen = new FormData();
    formDataImagen.append('archivo', fileObjectsOradorCuatro[0]);

    try {
      const subirImagen = await clienteAxios.post('/api/archivos', formDataImagen);
      setValues(prevState => ({
        ...prevState,
        cuatro_orador_imagen: subirImagen.data.archivo
      }));
    } catch (error) {
      const mensajeSwal = withReactContent(Swal);
      mensajeSwal.fire({
        title: 'Ups...',
        text: `No pudimos subir la imagen`,
        icon: 'error',
        timer: 3000
      });
    }
  }

  const enviarFormulario = async (e) => {
    e.preventDefault();
  
    const mensajeSwal = withReactContent(Swal);

    try {
      const postTaller = await clienteAxios.put(`/api/charlas/${editandoId}`, values);


      mensajeSwal.fire({
        title: '¡Excelente!',
        text: `El evento fue actualizado con éxito`,
        icon: 'success',
        timer: 3000
      }).then(()=> {
        window.location.replace("/agenda");
      });
    } catch (error) {
      mensajeSwal.fire({
        title: 'Ups...',
        text: `Hubo un error`,
        icon: 'error',
        timer: 3000
      });
    }
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
          subheader="Plato"
          title="EDITAR"
        />
        <Divider />
        <CardContent>
        <CardHeader
              subheader="Información de la Conferencia / MasterTalk"
              title="EVENTO"
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
                helperText="En español"
                label="Título del evento"
                margin="dense"
                name="es_titulo"
                onChange={handleChange}
                required
                value={values.es_titulo}
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
                helperText="Sin espacios, puntos, tildes ni carácteres especiales ( . , ñ á )"
                label="Slug"
                margin="dense"
                name="slug"
                onChange={handleChange}
                required
                value={values.slug}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={3}
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
                <option value={1}>Master-Talk</option>
                <option value={2}>Conferencia</option>
              </TextField>
            </Grid>
           
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Descripción corta"
                margin="dense"
                name="es_breve_descripcion"
                onChange={handleChange}
                required
                multiline={true}
                type="text"
                value={values.es_breve_descripcion}
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
                label="Descripción larga"
                margin="dense"
                name="es_larga_descripcion"
                onChange={handleChange}
                required
                multiline={true}
                type="text"
                value={values.es_larga_descripcion}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="Fecha"
                margin="dense"
                name="fecha"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.fecha}
                variant="outlined"
              >
                {dias.map(opcion => (
                  <option
                    key={opcion.dia}
                    value={opcion.dia}
                  >
                    {opcion.fecha}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="Hora"
                margin="dense"
                name="hora"
                onChange={handleChange}
                required
                type="time"
                value={values.hora}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="Duración (min)"
                margin="dense"
                name="duracion"
                onChange={handleChange}
                required
                type="number"
                value={values.duracion}
                variant="outlined"
              />
            </Grid>
            </Grid>
          </CardContent>
  
  
          <CardContent>
            <CardHeader
              subheader="Información del orador 1"
              title="ORADOR 1"
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
                margin="dense"
                label="Nombre del orador"
                name="orador_nombre"
                onChange={handleChange}
                type="text"
                value={values.orador_nombre}
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
                label="Apellido del orador"
                margin="dense"
                name="orador_apellido"
                onChange={handleChange}
                type="text"
                value={values.orador_apellido}
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
                label="LinkedIn del orador"
                margin="dense"
                name="orador_linkedin"
                onChange={handleChange}
                type="url"
                value={values.orador_linkedin}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setOpenOrador(true)}>
                  {
                    (values.orador_imagen === '') ? 'Subir foto del orador' : 'Cambiar foto del orador'
                  }     
                  </Button>

                <DropzoneDialog
                  acceptedFiles={['image/*']}
                  fileObjects={fileObjectsOrador}
                  cancelButtonText={"Cancelar"}
                  submitButtonText={"Adjuntar"}
                  dialogTitle={"Subir imagen"}
                  dropzoneText={"Hacé clic o arrastrá el archivo"}
                  maxFileSize={5242880} // 5 MB
                  filesLimit={1}
                  open={openOrador}
                  // onAdd={(nuevoArchivo) => {
                  //   console.log(nuevoArchivo);
                  //   console.log('onAdd', nuevoArchivo);
                  //   setFileObjects(nuevoArchivo);
                  // }}
                  onDrop={(nuevoArchivo) => {
                    setFileObjectsOrador(nuevoArchivo);
                  }}
                  onDelete={deleteFileObj => {
                    console.log('onDelete', deleteFileObj);
                  }}
                  onClose={() => setOpenOrador(false)}
                  onSave={() => {
                    onSaveImagenOrador();
                  }}
                  showPreviews={false}
                  showPreviewsInDropzone={true}
                  showFileNamesInPreview={true}
                />
              </div>
            </Grid>

            <Grid
              item
              md={4}
              xs={6}
            >
              <TextField
                fullWidth
                label="CV del orador"
                margin="dense"
                name="es_orador_cv"
                multiline={true}
                onChange={handleChange}
                type="text"
                value={values.es_orador_cv}
                variant="outlined"
              />
            </Grid>
            
            </Grid>
            </CardContent>

          <CardContent>
          <CardHeader
            subheader="Información del orador 2"
            title="ORADOR 2"
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
              margin="dense"
              label="Nombre del orador"
              name="dos_orador_nombre"
              onChange={handleChange}
              type="text"
              value={values.dos_orador_nombre}
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
              label="Apellido del orador"
              margin="dense"
              name="dos_orador_apellido"
              onChange={handleChange}
              type="text"
              value={values.dos_orador_apellido}
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
              label="LinkedIn del orador"
              margin="dense"
              name="dos_orador_linkedin"
              onChange={handleChange}
              type="url"
              value={values.dos_orador_linkedin}
              variant="outlined"
            />
          </Grid>

          <Grid
            item
            md={3}
            xs={12}
          >
            <div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setOpenOradorDos(true)}>
                {
                  (values.dos_orador_imagen === '') ? 'Subir foto del orador' : 'Cambiar foto del orador'
                }     
                </Button>

              <DropzoneDialog
                acceptedFiles={['image/*']}
                fileObjects={fileObjectsOradorDos}
                cancelButtonText={"Cancelar"}
                submitButtonText={"Adjuntar"}
                dialogTitle={"Subir imagen"}
                dropzoneText={"Hacé clic o arrastrá el archivo"}
                maxFileSize={5242880} // 5 MB
                filesLimit={1}
                open={openOradorDos}
                // onAdd={(nuevoArchivo) => {
                //   console.log(nuevoArchivo);
                //   console.log('onAdd', nuevoArchivo);
                //   setFileObjects(nuevoArchivo);
                // }}
                onDrop={(nuevoArchivo) => {
                  setFileObjectsOradorDos(nuevoArchivo);
                }}
                onDelete={deleteFileObj => {
                  console.log('onDelete', deleteFileObj);
                }}
                onClose={() => setOpenOradorDos(false)}
                onSave={() => {
                  onSaveImagenOradorDos();
                }}
                showPreviews={false}
                showPreviewsInDropzone={true}
                showFileNamesInPreview={true}
              />
            </div>
          </Grid>

          <Grid
            item
            md={4}
            xs={6}
          >
            <TextField
              fullWidth
              label="CV del orador 2"
              margin="dense"
              name="dos_es_orador_cv"
              multiline={true}
              onChange={handleChange}
              type="text"
              value={values.dos_es_orador_cv}
              variant="outlined"
            />
          </Grid>
          
          </Grid>
          </CardContent>

          <CardContent>
            <CardHeader
              subheader="Información del orador 3"
              title="ORADOR 3"
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
                margin="dense"
                label="Nombre del orador"
                name="tres_orador_nombre"
                onChange={handleChange}
                type="text"
                value={values.tres_orador_nombre}
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
                label="Apellido del orador"
                margin="dense"
                name="tres_orador_apellido"
                onChange={handleChange}
                type="text"
                value={values.tres_orador_apellido}
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
                label="LinkedIn del orador"
                margin="dense"
                name="tres_orador_linkedin"
                onChange={handleChange}
                type="url"
                value={values.tres_orador_linkedin}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setOpenOradorTres(true)}>
                  {
                    (values.tres_orador_imagen === '') ? 'Subir foto del orador' : 'Cambiar foto del orador'
                  }     
                  </Button>

                <DropzoneDialog
                  acceptedFiles={['image/*']}
                  fileObjects={fileObjectsOradorTres}
                  cancelButtonText={"Cancelar"}
                  submitButtonText={"Adjuntar"}
                  dialogTitle={"Subir imagen"}
                  dropzoneText={"Hacé clic o arrastrá el archivo"}
                  maxFileSize={5242880} // 5 MB
                  filesLimit={1}
                  open={openOradorTres}
                  // onAdd={(nuevoArchivo) => {
                  //   console.log(nuevoArchivo);
                  //   console.log('onAdd', nuevoArchivo);
                  //   setFileObjects(nuevoArchivo);
                  // }}
                  onDrop={(nuevoArchivo) => {
                    setFileObjectsOradorTres(nuevoArchivo);
                  }}
                  onDelete={deleteFileObj => {
                    console.log('onDelete', deleteFileObj);
                  }}
                  onClose={() => setOpenOradorTres(false)}
                  onSave={() => {
                    onSaveImagenOradorTres();
                  }}
                  showPreviews={false}
                  showPreviewsInDropzone={true}
                  showFileNamesInPreview={true}
                />
              </div>
            </Grid>

            <Grid
              item
              md={4}
              xs={6}
            >
              <TextField
                fullWidth
                label="CV del orador 3"
                margin="dense"
                name="tres_es_orador_cv"
                multiline={true}
                onChange={handleChange}
                type="text"
                value={values.tres_es_orador_cv}
                variant="outlined"
              />
            </Grid>
            
            </Grid>
            </CardContent>

          <CardContent>
            <CardHeader
              subheader="Información del orador 4"
              title="ORADOR 4"
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
                margin="dense"
                label="Nombre del orador"
                name="cuatro_orador_nombre"
                onChange={handleChange}
                type="text"
                value={values.cuatro_orador_nombre}
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
                label="Apellido del orador"
                margin="dense"
                name="cuatro_orador_apellido"
                onChange={handleChange}
                type="text"
                value={values.cuatro_orador_apellido}
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
                label="LinkedIn del orador"
                margin="dense"
                name="cuatro_orador_linkedin"
                onChange={handleChange}
                type="url"
                value={values.cuatro_orador_linkedin}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setOpenOradorCuatro(true)}>
                  {
                    (values.cuatro_orador_imagen === '') ? 'Subir foto del orador' : 'Cambiar foto del orador'
                  }     
                  </Button>

                <DropzoneDialog
                  acceptedFiles={['image/*']}
                  fileObjects={fileObjectsOradorCuatro}
                  cancelButtonText={"Cancelar"}
                  submitButtonText={"Adjuntar"}
                  dialogTitle={"Subir imagen"}
                  dropzoneText={"Hacé clic o arrastrá el archivo"}
                  maxFileSize={5242880} // 5 MB
                  filesLimit={1}
                  open={openOradorCuatro}
                  // onAdd={(nuevoArchivo) => {
                  //   console.log(nuevoArchivo);
                  //   console.log('onAdd', nuevoArchivo);
                  //   setFileObjects(nuevoArchivo);
                  // }}
                  onDrop={(nuevoArchivo) => {
                    setFileObjectsOradorCuatro(nuevoArchivo);
                  }}
                  onDelete={deleteFileObj => {
                    console.log('onDelete', deleteFileObj);
                  }}
                  onClose={() => setOpenOradorCuatro(false)}
                  onSave={() => {
                    onSaveImagenOradorCuatro();
                  }}
                  showPreviews={false}
                  showPreviewsInDropzone={true}
                  showFileNamesInPreview={true}
                />
              </div>
            </Grid>

            <Grid
              item
              md={4}
              xs={6}
            >
              <TextField
                fullWidth
                label="CV del orador 4"
                margin="dense"
                name="cuatro_es_orador_cv"
                multiline={true}
                onChange={handleChange}
                type="text"
                value={values.cuatro_es_orador_cv}
                variant="outlined"
              />
            </Grid>
            
            </Grid>
            </CardContent>


            <CardContent>
            <CardHeader
              subheader="Información de la empresa"
              title="EMPRESA"
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
                  label="Nombre de la empresa"
                  margin="dense"
                  name="nombre_empresa"
                  onChange={handleChange}
                  type="text"
                  value={values.nombre_empresa}
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
                  label="WhatsApp de la empresa"
                  helperText="Ejemplo ARG: 5491155556666"
                  margin="dense"
                  name="wpp"
                  onChange={handleChange}
                  type="number"
                  value={values.wpp}
                  variant="outlined"
                />
              </Grid>
              <Grid
              item
              md={3}
              xs={12}
            >
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setOpenLogo(true)}>
                    {
                      (values.logo_empresa === '') ? 'Subir logo de empresa' : 'Cambiar logo de empresa'
                    }                    
                    </Button>

                <DropzoneDialog
                  acceptedFiles={['image/*']}
                  fileObjects={fileObjectsLogo}
                  cancelButtonText={"Cancelar"}
                  submitButtonText={"Adjuntar"}
                  dialogTitle={"Subir imagen"}
                  dropzoneText={"Hacé clic o arrastrá el archivo"}
                  maxFileSize={5242880} // 5 MB
                  filesLimit={1}
                  open={openLogo}
                  // onAdd={(nuevoArchivo) => {
                  //   console.log(nuevoArchivo);
                  //   console.log('onAdd', nuevoArchivo);
                  //   setFileObjectsLogo(nuevoArchivo);
                  // }}
                  onDrop={(nuevoArchivo) => {
                    setFileObjectsLogo(nuevoArchivo);
                  }}
                  onDelete={deleteFileObj => {
                    console.log('onDelete', deleteFileObj);
                  }}
                  onClose={() => setOpenLogo(false)}
                  onSave={() => {
                    onSaveImagenLogo();
                  }}
                  showPreviews={false}
                  showPreviewsInDropzone={true}
                  showFileNamesInPreview={true}
                />
              </div>
            </Grid>
            </Grid>
            </CardContent>

            <CardContent>
            <CardHeader
              subheader="Información adicional"
              title="ADICIONALES"
            />
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
                margin="dense"
                label="Link de ZOOM"
                name="zoom_link"
                onChange={handleChange}
                type="text"
                value={values.zoom_link}
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
                margin="dense"
                label="ID de YouTube"
                name="youtube"
                onChange={handleChange}
                type="text"
                value={values.youtube}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={3}
            >
              <TextField
                fullWidth
                label="Plan contratado"
                margin="dense"
                name="e_plan"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.e_plan}
                variant="outlined"
              >
                <option value={'mastertalk'}>Master-Talk</option>
                <option value={'basico'}>Básico</option>
                <option value={'intermedio'}>Intermedio</option>
                <option value={'avanzado'}>Avanzado</option>
                <option value={'premium'}>Premium</option>
              </TextField>
                {
                  planes.map(plan => {
                    if(values.e_plan === plan.nombre) {
                      return (
                        <p>$ {plan.precio}</p>
                      )
                    }
                  })
                }
            </Grid>
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Descuento (%)"
                margin="dense"
                name="e_descuento"
                onChange={handleChange}
                type="number"
                max={100}
                value={values.e_descuento}
                variant="outlined"
              />
              {
                planes.map(plan => {
                  if(values.e_plan === plan.nombre) {
                    return (
                      <p>$ {(plan.precio * values.e_descuento) / 100}</p>
                    )
                  }
                })
              }
            </Grid>
            </Grid>
            </CardContent>

            <CardContent>
            <CardHeader
              subheader="Traducción al Portugués"
              title="PORTUGUÉS"
            />
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
                margin="dense"
                label="Titulo del evento en portugués"
                name="po_titulo"
                onChange={handleChange}
                type="text"
                value={values.po_titulo}
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
                margin="dense"
                label="Descripción breve en portugués"
                name="po_breve_descripcion"
                onChange={handleChange}
                type="text"
                multiline={true}
                value={values.po_breve_descripcion}
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
                margin="dense"
                label="Descripción larga en portugués"
                name="po_larga_descripcion"
                onChange={handleChange}
                multiline={true}
                type="text"
                value={values.po_larga_descripcion}
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
                margin="dense"
                label="CV del orador en portugués"
                name="po_orador_cv"
                onChange={handleChange}
                multiline={true}
                type="text"
                value={values.po_orador_cv}
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
                margin="dense"
                label="CV del orador 2 en portugués"
                name="dos_po_orador_cv"
                onChange={handleChange}
                multiline={true}
                type="text"
                value={values.dos_po_orador_cv}
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
                margin="dense"
                label="CV del orador 3 en portugués"
                name="tres_po_orador_cv"
                onChange={handleChange}
                multiline={true}
                type="text"
                value={values.tres_po_orador_cv}
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
                margin="dense"
                label="CV del orador 4 en portugués"
                name="cuatro_po_orador_cv"
                onChange={handleChange}
                multiline={true}
                type="text"
                value={values.cuatro_po_orador_cv}
                variant="outlined"
              />
            </Grid>
           
            </Grid>
            </CardContent>

            <CardContent>
            <CardHeader
              subheader="Traducción al Inglés"
              title="INGLÉS"
            />
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
                margin="dense"
                label="Titulo del evento en inglés"
                name="en_titulo"
                onChange={handleChange}
                type="text"
                value={values.en_titulo}
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
                margin="dense"
                label="Descripción breve en inglés"
                name="en_breve_descripcion"
                onChange={handleChange}
                type="text"
                multiline={true}
                value={values.en_breve_descripcion}
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
                margin="dense"
                label="Descripción larga en inglés"
                name="en_larga_descripcion"
                onChange={handleChange}
                multiline={true}
                type="text"
                value={values.en_larga_descripcion}
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
                margin="dense"
                label="CV del orador en inglés"
                name="en_orador_cv"
                onChange={handleChange}
                multiline={true}
                type="text"
                value={values.en_orador_cv}
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
                margin="dense"
                label="CV del orador 2 en inglés"
                name="dos_en_orador_cv"
                onChange={handleChange}
                multiline={true}
                type="text"
                value={values.dos_en_orador_cv}
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
                margin="dense"
                label="CV del orador 3 en inglés"
                name="tres_en_orador_cv"
                onChange={handleChange}
                multiline={true}
                type="text"
                value={values.tres_en_orador_cv}
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
                margin="dense"
                label="CV del orador 4 en inglés"
                name="cuatro_en_orador_cv"
                onChange={handleChange}
                multiline={true}
                type="text"
                value={values.cuatro_en_orador_cv}
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
            Guardar
          </Button>
          
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
