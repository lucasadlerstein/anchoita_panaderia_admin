import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api`
});

export default clienteAxios;