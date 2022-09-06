import axiosAPI from "../AxiosAPI";

export const getCommandeList = ()=>{
    return axiosAPI.get('/commande/readcommande.php');
};

export const createCommande = (params) => {
    return axiosAPI.post('/commande/createCommande.php', params)
}

export const updateCommande = (params) => {
    return axiosAPI.put('/commande/updateCommande.php', params)
}

export const deleteCommande = num_co =>{
    return axiosAPI.delete(`/commande/deleteCommande.php?num_co=${num_co}`)
}

export const getCommandeByCli = num_cli => {
    return axiosAPI.get(`/commande/read_single_commande.php?num_cli=${num_cli}`)
}