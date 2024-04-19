import { useCallback, useState } from "react";

import { useQuote } from "../../../../context/Quote/QuoteContext";
import { ChartData } from "../../Charts/ChartsContainer";
import { saveFeeData, saveTransactionsData, saveUserData } from "../../../../service/SessionStorageService/saveAllInSessionStorage";
import { DATA_SAVED } from "../../../../contants/sessionStorageKeys/sessionStorageKeys";
import { fetchCoinsData } from "../../../../service/CoinsService/fetchCoinsData";
import { fetchBalance } from "../../../../service/BalanceService/fetchBalance";
import { useBalance } from "../../../../context/Balance/BalanceContext";



export const useDataSaver = () => {

    const { state, dispatch, useTotalBalance } = useBalance();
    const { dispatch: quoteDispatch } = useQuote();
    const [chartData, setChartData] = useState<ChartData[]>([]);

    const fetchSessionStorageData = useCallback(async () => {

        try {
    
          
          await Promise.all([saveUserData(), saveFeeData(), saveTransactionsData()]);
          sessionStorage.setItem(DATA_SAVED, 'true');
          
    
        } catch(e:any) {
    
        }
        
    },[])

    
    const fetchAllData = useCallback(async () => {

        try {
    
    
            await fetchCoinsData(quoteDispatch, setChartData);
            await fetchBalance(dispatch);
           
    
        } catch(e:any) {
    
    
        }
    
      },[]);

      const totalBalance = (useTotalBalance(state));


      return {
        
        chartData,
        totalBalance,
        fetchAllData,
        fetchSessionStorageData,
  

      }


}