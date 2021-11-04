// import React from 'react';
// import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/styles';
// import {
//   IconButton,
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Grid,
//   Divider
// } from '@material-ui/core';
// import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
// import CreateIcon from '@material-ui/icons/Create';
// import DeleteIcon from '@material-ui/icons/Delete';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
// import clienteAxios from '../../../../config/axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import ScheduleIcon from '@material-ui/icons/Schedule';


// const useStyles = makeStyles(theme => ({
//   root: {},
//   imageContainer: {
//     height: 'auto',
//     maxHeight: '150px',
//     width: '100%',
//     margin: '0 auto',
//     border: `1px solid ${theme.palette.divider}`,
//     borderRadius: '5px',
//     overflow: 'hidden',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   image: {
//     width: '100%'
//   },
//   titulo: {
//     margin: '30px 0 15px 0'
//   },
//   statsItem: {
//     display: 'flex',
//     alignItems: 'center'
//   },
//   statsIcon: {
//     color: theme.palette.icon,
//     marginRight: theme.spacing(1)
//   },
//   statsIconDobleMargin: {
//     color: theme.palette.icon,
//     marginRight: theme.spacing(1),
//     marginLeft: theme.spacing(1)

//   }
// }));

// const ProductCard = props => {
//   const { className, product, ...rest } = props;

//   const classes = useStyles();

//   const ConfirmacionSwal = withReactContent(Swal)
  
//   const eliminarTaller = (id) => {
//     ConfirmacionSwal.fire({
//       title: '¿Seguro querés borrarlo?',
//       text: `Si lo eliminas, no podes recuperarlo`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#0E3453',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Eliminar',
//       cancelButtonText: 'Cancelar'
//     }).then( async (result)  => {
//       if(result.value){
//         try {
//           const resEliminar = await clienteAxios.delete(`/api/charlas/${id}`);  
//           ConfirmacionSwal.fire({
//             title: 'Eliminado con éxito',
//             text: "Listo, ya lo eliminaste",
//             icon: 'success',
//             timer: 2000,
//           }).then( () => {
//             window.location.reload(false);
//           });
//         } catch (error) {
//           ConfirmacionSwal.fire({
//             title: 'Ups!',
//             text: "No pudimos eliminar el evento",
//             icon: 'error',
//             timer: 2000,
//           });
//         }
//       }
//     }); 
//   }
  
//   const cambiarVisibilidad = async (id, vi) => {
//     let viNuevo;
//     vi === 1 ? viNuevo = 0 : viNuevo = 1;
//     const respuesta = await clienteAxios.put(`/api/charlas/visibilidad/${id}/${viNuevo}`);
    
    
//     if(respuesta.data.fue === 1){
      
//       ConfirmacionSwal.fire({
//         title: 'Excelente',
//         text: viNuevo ? `Ya está visible` : `Ya no está más visible`,
//         icon: 'success',
//         timer: 2500}).then(() => {
//           window.location.reload(false);
//         });
//     }
//   }

//   const dias = [
//     {
//       dia: 1,
//       fecha: '23 nov'
//     },
//     {
//       dia: 2,
//       fecha: '24 nov'
//     },
//     {
//       dia: 3,
//       fecha: '25 nov'
//     },
//     {
//       dia: 4,
//       fecha: '26 nov'
//     },
//     {
//       dia: 5,
//       fecha: '27 nov'
//     },
//     {
//       dia: 6,
//       fecha: '28 nov'
//     },
//     {
//       dia: 7,
//       fecha: '29 nov'
//     },
//     {
//       dia: 8,
//       fecha: '30 nov'
//     },
//     {
//       dia: 9,
//       fecha: '01 dic'
//     },
//     {
//       dia: 10,
//       fecha: '02 dic'
//     }
//   ]

//   return (
//     <Card
//       {...rest}
//       className={clsx(classes.root, className)}
//     >
//       <CardContent>
//         <div className={classes.imageContainer}>
//         <a href={`https://latamhospitals.com/${Number(product.categoria) === 1 ? 'mastertalk' : 'conferencia'}/${product.slug}`} target="_blank">
//           <img
//             alt={product.es_titulo}
//             className={classes.image}
//             src={`${process.env.REACT_APP_BASE_URL}/static/${(product.orador_imagen) ? product.orador_imagen : product.logo_empresa}`}
//           />
//           </a>
//         </div>
//         <Typography
//           align="center"
//           gutterBottom
//           variant="h4"
//           className={classes.titulo}
//         >
//           {product.es_titulo}
//         </Typography>
//         <Typography
//           align="center"
//           variant="body1"
//         >
//           {`${product.orador_nombre} ${product.orador_apellido}`}
//         </Typography>
//       </CardContent>
//       <Divider />
//       <CardActions>
//         <Grid
//           container
//           justify="space-between"
//         >
//           <Grid
//             className={classes.statsItem}
//             item
//           >
//             <CalendarTodayIcon className={classes.statsIcon} />
//               <Typography
//                 display="inline"
//                 variant="body2"
//               >
//                 {
//                   dias.map(dia => {
//                     if(dia.dia === product.fecha) {
//                       return dia.fecha
//                     }
//                   })
//                 }
//               </Typography>
//               <ScheduleIcon className={classes.statsIconDobleMargin} />
//               <Typography
//                 display="inline"
//                 variant="body2"
//               >
//                 {(product.hora).slice(0, -3)}
//               </Typography>
//           </Grid>
//           <Grid
//             className={classes.statsItem}
//             item
//           >
//               <IconButton 
//                 onClick={() => cambiarVisibilidad(product.id, product.visibilidad)}>
//                 {product.visibilidad === 1 ? (
//                   <VisibilityOffIcon />
//                 ) : (
//                   <VisibilityIcon />
//                 ) }
//               </IconButton>
//             <Link to={`/editar-agenda?id=${product.id}`}>
//               <IconButton>
//                 <CreateIcon />
//               </IconButton>
//             </Link>
//             <IconButton
//               onClick={() => eliminarTaller(product.id)}
//             >
//               <DeleteIcon/>
//             </IconButton>
//           </Grid>
//         </Grid>
//       </CardActions>
//     </Card>
//   );
// };

// ProductCard.propTypes = {
//   className: PropTypes.string,
//   product: PropTypes.object.isRequired
// };

// export default ProductCard;
