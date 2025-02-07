import axios from "axios";
import { USDC_ENDPOINT, USDT_ENDPOINT } from "./endpoints";
import { USD_OUT } from "../../contants/divisionValues/divisionValues";

export const getUSDTData = async () => {
    
    try {

        const requestUsdc = await axios.get(USDC_ENDPOINT);
        const usdcData = requestUsdc.data;

        const request = await axios.get(USDT_ENDPOINT);
        const usdtData = request.data;
        
        return usdtData.map((data:any, index:number) => {


            const usdcClose = parseFloat(usdcData[index][4]);

            const usdtToUsdc =  usdcClose;

            return {


                open: data[1],
                high: data[2],
                low: data[3],
                close: data[4],
                volume: data[5],
                emmitedDate: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
                toBrl: (parseFloat(data[4])) * USD_OUT,
                toUsdc: 1 / parseFloat(usdtToUsdc.toFixed(8)),
                pctChange: (((parseFloat(data[4]) - parseFloat(data[1])) / parseFloat(data[1])) * 100).toFixed(2)

            };

        });

    } catch (error:any) {

        console.error('Erro ao mapear dados de USDT: ', error.message || error.data?.message);
        throw new Error('Erro ao mapear dados de USDT: ', error.message || error.data?.message);

    }
};