import axiosAPI from "../AxiosAPI";

export const getClientList = ()=>{
    return axiosAPI.get('/client/readclient.php');
};

export const createClient = (params) => {
    return axiosAPI.post('/client/createClient.php', params)
}

export const updateClient = (params) => {
    return axiosAPI.put('/client/updateClient.php', params)
}

export const deleteClient = num_cli =>{
    return axiosAPI.delete(`/client/deleteClient.php?num_cli=${num_cli}`)
}