
import { useContext, useReducer, createContext } from "react";
import { ProviderProps } from "../types/Provider/Provider";


export type CoinTypes = "BRL" | "USDC" | "USDT";

export type CurrencyState = {

    sendCurrency: CoinTypes;
    receiveCurrency: CoinTypes;
    sendValue: string;
    receiveValue: string;
    fixOutput: boolean;
    pixkey: string;
    taxId : string;
    walletAddress: string;

}


export enum CurrencyActions {

    setSendCurrency,
    setReceiveCurrency,
    setSendValue,
    setReceiveValue,
    setFixOutput,
    setTaxId,
    setPixkey,
    setWalletAddress,
}

type Action = {
    type: CurrencyActions;
    payload: any;
}

type ContextType = {
    state: CurrencyState;
    dispatch: (action: Action) => void;
    getCoin: (currency: string) => string;
    conversor : (value: string, fromCurrency: string, toCurrency: string, conversionTable:any) => string
}

const initialData :CurrencyState = {
    
    sendCurrency: 'BRL',
    receiveCurrency: 'USDC',
    sendValue: '',
    receiveValue: '',
    fixOutput: false,
    pixkey: '',
    taxId: '',
    walletAddress: '',

}

const CurrencyContext = createContext<ContextType | undefined>(undefined);



const currencyReducer = (state: CurrencyState, action: Action) => {

    switch(action.type) {

        case CurrencyActions.setSendCurrency:
            return {...state, sendCurrency: action.payload.sendCurrency};
        case CurrencyActions.setReceiveCurrency:
            return {...state, receiveCurrency: action.payload.receiveCurrency};
        case CurrencyActions.setSendValue:
            return {...state, sendValue: action.payload.sendValue};
        case CurrencyActions.setReceiveValue:
            return {...state, receiveValue: action.payload.receiveValue};
        case CurrencyActions.setFixOutput:
            return {...state, fixOutput: action.payload.fixOutput};
        case CurrencyActions.setPixkey:
            return {...state, pixkey: action.payload.pixkey};
        case CurrencyActions.setTaxId:
            return {...state, taxId: action.payload.taxId};
        case CurrencyActions.setWalletAddress:
            return {...state, walletAddress: action.payload.walletAddress};

        default: 
             return state;
    }

}

const getCoin = (currency: string) => {

    switch(currency) {

        case 'BRL':
            return 'BRL'
        case 'USDC': 
        case 'USDT': 
            return 'USD'

        default: 
            return 'USD';

    }
}



const conversor = (value: string, fromCurrency: string, toCurrency: string, conversionTable:any) => {
    

    const amountInDefaultCurrency = parseFloat(value);

    let amountInSecondCurrency;

    if (conversionTable[fromCurrency] && conversionTable[fromCurrency][toCurrency]) {
     
        const conversionRate = conversionTable[fromCurrency][toCurrency];
        amountInSecondCurrency = amountInDefaultCurrency * conversionRate;

    } else if (conversionTable[toCurrency] && conversionTable[toCurrency][fromCurrency]) {
     
        const conversionRate = conversionTable[toCurrency][fromCurrency];
        amountInSecondCurrency = amountInDefaultCurrency / conversionRate;
    } else {
     
        return value;
    }
    

    return amountInSecondCurrency.toFixed(2).replace(".", ",");


}




export const CurrencyProvider = ({children}: ProviderProps) => {

    const [state, dispatch] = useReducer(currencyReducer,initialData);

    const value = {state, dispatch, getCoin, conversor};

    return (

        <CurrencyContext.Provider value={value}>

                {children}

        </CurrencyContext.Provider>
    );

}



export const useCurrency = () => {

    const context = useContext(CurrencyContext);

    if(context===undefined) {
        throw new Error('useCurrency precisa ser usado dentro do values provider')
    }

    return context;

}