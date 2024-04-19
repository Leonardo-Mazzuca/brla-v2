import { BalanceState } from "../../context/Balance/BalanceContext";

export const getAvaliableBalance = (coin: string, state: BalanceState) => {

    switch (coin) {
        
        case 'BRL':
            return state.brlBalance;

        case 'USDC':
            return state.usdcBalance;
   
        case 'USDT':
            return state.usdtBalance;

        default:
            return 0;
    }

}