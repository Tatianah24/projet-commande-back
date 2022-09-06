import axiosAPI from "../AxiosAPI";

export const getChiffreList = ()=>{
    return axiosAPI.get('/chiffre_affaire/readchiffre.php');
};