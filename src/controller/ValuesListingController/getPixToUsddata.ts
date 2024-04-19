import { http } from "../ConectAPI/conectApi";

//implementar esse documento depois

export const getPixToUsdData = async () => {



    try {

        const request = await http.get('/pay-in/pix-to-usd/history', {
            withCredentials: true
        });

        // console.log('PixToUsd data: ', request.data.depositsLogs);


    } catch(e:any) {

        throw new Error('Erro ao mapear dados de PixToUsd: ', e.message || e.data?.message);
        
    }
}