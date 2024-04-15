
import { BRLA_MARKUP, BRLA_OUT } from "../../contants/divisionValues/divisionValues";
import { getBaseFee } from "../FeeController/getBaseFee";
import { getUSDCData } from "./USDCData";
import { getUSDTData } from "./USDTData";


export const getBRLData = async () => {
    
    try {

        const USDC = await getUSDCData();
        const USDT = await getUSDTData();
        const fee = await getBaseFee();

        const brlData = {

            toUsdc: BRLA_MARKUP / (USDC[0].toBrl * BRLA_OUT),
            toUsdt: BRLA_MARKUP / (USDT[0].toBrl * BRLA_OUT),
            toBrl: fee.pixOutFee
            
        };
        
        return brlData;


    } catch (error:any) {

        throw error;
        
    }

};

