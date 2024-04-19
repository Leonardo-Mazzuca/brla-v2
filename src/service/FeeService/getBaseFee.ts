import { getUSDCData } from "../../controller/CoinDataAPI/USDCData";
import { getUSDTData } from "../../controller/CoinDataAPI/USDTData";



export const getMarkupFee = async (currency: string) => {

    const usdc = await getUSDCData();
    const usdt = await getUSDTData();

    const usdcFee = usdc.map((item:any)=> item.toUsdt)[0];
    const usdtFee = usdt.map((item:any)=> item.toUsdc)[0];

    switch(currency) {
        
        case 'USDC':
            return usdcFee;
        case 'USDT':
            return usdtFee;
        default:
            return 0;

    }


}