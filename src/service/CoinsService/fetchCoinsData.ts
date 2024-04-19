
import { ChartData } from "../../components/model/Charts/ChartsContainer";
import { QuoteActions } from "../../context/Quote/QuoteContext";
import { getBRLData } from "../../controller/CoinDataAPI/BRLData";
import { getUSDCData } from "../../controller/CoinDataAPI/USDCData";
import { getUSDTData } from "../../controller/CoinDataAPI/USDTData";

import { controllChartData } from "../ChartService/controllChartData";



export const fetchCoinsData = async (dispatch: (action: any) => void, 
setChartData: React.Dispatch<React.SetStateAction<ChartData[]>>) => {

    try {

        const usdc = await getUSDCData();
        const usdt = await getUSDTData();
        const brl = await getBRLData();
        

        if (usdc && usdt && brl) {
          dispatch({
            type: QuoteActions.setUSDCQuote,
            payload: { usdc },
          });
          dispatch({
            type: QuoteActions.setUSDTQuote,
            payload: { usdt },
          });
          dispatch({
            type: QuoteActions.setBRLQuote,
            payload: { brl },
          });
        }

        setChartData(controllChartData(usdc, usdt));

      } catch (e: any) {
        console.log(e.message);
      }

}