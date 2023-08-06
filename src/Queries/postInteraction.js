import axios from "axios";

export const postInteraction = async (form) => {

    const url = "http://127.0.0.1:8000/api";

    const clienteAxios = axios.create({ baseURL: url });

    const { data } = await clienteAxios.post('/interaccion/create',form);
    return data;   

}