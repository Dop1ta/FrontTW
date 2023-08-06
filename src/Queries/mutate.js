import axios from "axios";

export const mutateExample = async (form) => {

    console.log(form)
    
    const url = "http://127.0.0.1:8000/api"; 

    const clienteAxios = axios.create({ baseURL: url });

    const { data } = await clienteAxios.post('/perro/create',form);
    return data;   
}