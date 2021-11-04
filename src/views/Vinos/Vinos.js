import React, { useState, useEffect } from 'react';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ProductsToolbar, ProductCard } from './components';
import clienteAxios from '../../config/axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'anada', numeric: false, disablePadding: false, label: 'Añada' },
  { id: 'bodega', numeric: false, disablePadding: false, label: 'Bodega' },
  { id: 'tipo', numeric: false, disablePadding: false, label: 'Tipo' },
  { id: 'uva', numeric: false, disablePadding: false, label: 'Uva' },
  { id: 'precio', numeric: true, disablePadding: false, label: 'Precio' },
  { id: 'acciones', numeric: false, disablePadding: false, label: 'Acciones' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));


const Vinos = () => {

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nombre');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function traerVinos() {
      try {
        const vinosConsulta = await clienteAxios.get('/vinos/todos');
        setItems(vinosConsulta.data.vinos);
      } catch (error) {
        console.log('DBERROR');
      }
    }
    traerVinos();
  }, [])

  const ConfirmacionSwal = withReactContent(Swal)
  
  const eliminarBtn = (id) => {
    ConfirmacionSwal.fire({
      title: '¿Seguro querés borrarlo?',
      text: `Si lo eliminas, no podes recuperarlo`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0E3453',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then( async (result)  => {
      if(result.value){
        try {
          const resEliminar = await clienteAxios.delete(`/vinos/${id}`);  
          ConfirmacionSwal.fire({
            title: 'Eliminado con éxito',
            text: "Listo, ya lo eliminaste",
            icon: 'success',
            timer: 2000,
          }).then( () => {
            window.location.reload(false);
          });
        } catch (error) {
          ConfirmacionSwal.fire({
            title: 'Ups!',
            text: "No pudimos eliminar el vino",
            icon: 'error',
            timer: 2000,
          });
        }
      }
    }); 
  }
  
  const cambiarVisibilidad = async (id) => {
    try {
      const respuesta = await clienteAxios.put(`/general/visibilidad/vinos/${id}`);
      ConfirmacionSwal.fire({
        title: 'Excelente',
        text: 'Modificado exitosamente',
        icon: 'success',
        timer: 2500}).then(() => {
          window.location.reload(false);
        });
    } catch (error) {
      ConfirmacionSwal.fire({
        title: 'Ups',
        text: 'No pudimos cambiar la visibilidad',
        icon: 'error',
        timer: 3000
      });
    }
  }

  const editarItem = id => {
    window.location.href = `/agregar-vino?id=${id}`;
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = items.map((n) => n.nombre);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

  const [num, setNum] = useState(1);
  const [busqueda, setBusqueda] = useState(null);

  const handleChangeBuscador = (e) => {
    setBusqueda(e.target.value)
  }

  return (
    <div className={classes.root}>
      <ProductsToolbar />
      <div className={classes.content}>
        
      <div className={classes.root}>
      <input
        type="text"
        placeholder="Escribí para buscar..."
        onChange={handleChangeBuscador}
        value={busqueda}
        style={{
          marginBottom: '20px',
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: '1px solid black',
          fontSize: '16px',
          padding: '8px'
        }}
        />  
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={items.length}
            />
            <TableBody>
              {stableSort(items, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  // const isItemSelected = isSelected(item.nombre);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  if (
                    (busqueda === null || busqueda === '') || (
                    (busqueda !== null || busqueda !== '') && (
                      item.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()) ||
                      item.tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()) ||
                      item.uva.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()) ||
                      item.bodega.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase())))) {

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, item.nombre)}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={item.id}
                      // selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        {/* <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        /> */}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {item.nombre}
                      </TableCell>
                      <TableCell align="left">{item.anada}</TableCell>
                      <TableCell align="left">{item.bodega}</TableCell>
                      <TableCell align="left">{item.tipo}</TableCell>
                      <TableCell align="left">{item.uva}</TableCell>
                      <TableCell align="right">${item.precio}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => eliminarBtn(item.id)}
                        ><DeleteIcon /></IconButton>
                        <IconButton
                          onClick={() => editarItem(item.id)}
                        ><EditIcon /></IconButton>
                        {
                          (item.visible === true) ? (
                            <IconButton
                              onClick={() => cambiarVisibilidad(item.id) }
                            ><VisibilityOffIcon /></IconButton>
                          ) : (
                            <IconButton
                              onClick={() => cambiarVisibilidad(item.id) }
                            ><VisibilityIcon /></IconButton>
                          )
                        }
                      </TableCell>
                    </TableRow>
                  ); }
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 50, 100, 300, 500]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage={'Columnas por página'}
        />
      </Paper>
      </div>
      </div>
    </div>
  );
};

export default Vinos;
