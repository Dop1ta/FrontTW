import axios from "axios";

export const ListDogs = async () => {
    const url = "http://127.0.0.1:8000/api"; 

    const clienteAxios = axios.create({ baseURL: url });

    try {
        const response = await clienteAxios.get('/perro/list');
        return response;
    } catch (error) {
        console.error("Error fetching dog list:", error);
        throw error;
    }
};
