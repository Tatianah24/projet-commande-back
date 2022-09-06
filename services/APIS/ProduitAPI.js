import axiosAPI from "../AxiosAPI";

export const getProduitList = ()=>{
    return axiosAPI.get('/produit/readproduit.php');
};

export const createProduit = (params) => {
    return axiosAPI.post('/produit/createProduit.php', params)
}

export const updateProduit = (params) => {
    return axiosAPI.put('/produit/updateProduit.php', params)
}

export const deleteProduit = num_pro =>{
    return axiosAPI.delete(`/produit/deleteProduit.php?num_pro=${num_pro}`)
}