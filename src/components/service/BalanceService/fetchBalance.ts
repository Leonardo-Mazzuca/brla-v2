import { BalanceActions } from "../../context/BalanceContext";
import { userBalanceController } from "../../controller/UserBalanceController/userBalanceController";
import { BalanceData } from "../../types/BalanceData/BalanceData";



export const fetchBalance = async (dispatch: (action: any) => void) => {

    try {
        
        const data: BalanceData | false = await userBalanceController();
        
        if (data) {

          dispatch({
            type: BalanceActions.setAllBalances,
            payload: {
              brlBalance: data.brlBalance,
              usdcBalance: data.usdcBalance,
              usdtBalance: data.usdtBalance,
            },
          });

        }

      } catch (e: any) {

        throw new Error("Error fetching balance:", e.message || e.data?.message)
       
      }

}