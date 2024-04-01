
import { getUSDCData } from "./USDCData";
import { getUSDTData } from "./USDTData";


export const getBRLData = async () => {
    
    try {

        const USDC = await getUSDCData();
        const USDT = await getUSDTData();

        const brlData = {

            toUsdc: 1 / USDC[0].toBrl,
            toUsdt: 1 / USDT[0].toBrl,
            
        };
        
        return brlData;


    } catch (error:any) {
        console.error(error.message);
        throw error;
    }

};

