

import { useContext, useReducer, createContext  } from "react";
import { useQuote } from "../Quote/QuoteContext";
import { ProviderProps } from "../../@types/Provider/Provider";



export type BalanceState = {

    brlBalance: number;
    usdcBalance: number;
    usdtBalance: number;
    
}


type Action = {
    type: BalanceActions;
    payload: any;
}

type ContextType = {

    state: BalanceState
    dispatch: (action: Action) => void
    getCoinToBalance: (coin: string, state: BalanceState) => number;
    useTotalBalance: (state:BalanceState) => number;

}


const BalanceContext = createContext<ContextType | undefined>(undefined);

const initialData: BalanceState = {

    brlBalance: 0,
    usdcBalance: 0,
    usdtBalance: 0,
    

}

enum BalanceActions {


    setBrlBalance,
    setUsdcBalance,
    setUsdtBalance,
    setAllBalances,

}

const balanceReducer = (state: BalanceState, action: Action) => {
    switch (action.type) {
        case BalanceActions.setBrlBalance:
            return {
                ...state,
                brlBalance: action.payload.brlBalance,
            };


        case BalanceActions.setUsdcBalance:
            return {
                ...state,
                usdcBalance: action.payload.usdcBalance,
            };


        case BalanceActions.setUsdtBalance:
            return {
                ...state,
                usdtBalance: action.payload.usdtBalance,
            };

        case BalanceActions.setAllBalances:
            return {
                ...state,
                brlBalance: action.payload.brlBalance,
                usdcBalance: action.payload.usdcBalance,
                usdtBalance: action.payload.usdtBalance,
            }

        default:
            return state;
    }
};

const getCoinToBalance = (coin: string, state: BalanceState) => {



    switch(coin) {
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
   


const BalanceProvider = ({ children }: ProviderProps) => {

    const [state, dispatch] = useReducer(balanceReducer, initialData);

    const value = {state, dispatch, getCoinToBalance, useTotalBalance};

    return <BalanceContext.Provider value={value}>
                 {children}
        </BalanceContext.Provider>;
};

const useTotalBalance = (state:BalanceState) => {

    const {state:quoteState, operations} = useQuote();

    const convertToBrl = operations.convertToBrl;

    const totalBalance:number = state.brlBalance + 
    convertToBrl(quoteState, state.usdcBalance, 'USDC') +
    convertToBrl(quoteState, state.usdtBalance, 'USDT')
   
    return totalBalance;

}


const useBalance = () => {
    
    const context = useContext(BalanceContext);

    if(context===undefined) {
        throw new Error('useBalance precisa ser usado dentro do balance provider')
    }

    return context;
}


export {useBalance, BalanceActions, useTotalBalance, BalanceProvider}