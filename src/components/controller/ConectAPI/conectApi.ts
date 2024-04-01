import axios, { AxiosInstance } from "axios";

const createHttp = (): AxiosInstance => {

    const BASE_URL = 'https://api.brla.digital:4567/v1/business';
    const PRODUCTION_BASE_URL = 'https://api.brla.digital:5567/v1/business'
    
    const http = axios.create({
        baseURL: BASE_URL,
    });

    return http;
    
};

export const http = createHttp();





