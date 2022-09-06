export const requestInterceptor = (config) => {
    const accessToken="";

    if(accessToken != null){
        config.headers["x-auth"] = accessToken
    }
    return config;
};

export const responseInterceptor = (config) => {
    //console.log("Response axios:", config.data);
    return config.data;
};

export const requestErrorHandler = error =>{
    const originalConfig = error.config;

    if(error?.response?.status === 401 && !originalConfig._retry) {
        console.log("Data is unauthorized...");
    }
    alert(error);
    return Promise.reject(errorObj);
};

export const responseErrorHandler = error => {
    return Promise.reject(error);
}