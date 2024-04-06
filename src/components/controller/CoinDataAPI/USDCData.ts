import axios from "axios";
import { USDC_ENDPOINT, USDT_ENDPOINT } from "./endpoints";

export const getUSDCData = async () => {

    try {

        const requestUsdt = await axios.get(USDT_ENDPOINT);
        const usdtData = requestUsdt.data;

        const requestUsdc = await axios.get(USDC_ENDPOINT);
        const usdcData = requestUsdc.data;

        

        return usdcData.map((data:any, index:number) => {

            const usdtClose = parseFloat(usdtData[index][4]);
            const usdcClose = parseFloat(data[4]);
            const usdcToUsdt = parseFloat(data[4]);

            return {

                open: data[1],
                high: data[2],
                low: data[3],
                close: data[4],
                volume: data[5],
                emmitedDate: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
                toUsdt: parseFloat(usdcToUsdt.toFixed(8)),
                toBrl: usdcClose * usdtClose,
                pctChange: (((parseFloat(data[4]) - parseFloat(data[1])) / parseFloat(data[1])) * 100).toFixed(2),

            };
            
        });

        

    } catch (error:any) {

        console.error('Erro ao mapear dados de USDC: ', error.message || error.data?.message);
        throw new Error('Erro ao mapear dados de USDC: ', error.message || error.data?.message);

    }
};
