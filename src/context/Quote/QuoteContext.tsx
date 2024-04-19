

import { useContext, useReducer, createContext  } from "react";
import { ProviderProps } from "../../@types/Provider/Provider";


export type QuoteState = {

    brl: any;
    usdc: any[];
    usdt: any[]
    
}


type Action = {
    type: QuoteActions;
    payload: any;
}

export type ConversionTable = {

    BRL : {USDC: number, USDT: number, BRL: number};
    USDC:  {BRL: number, USDT: number};
    USDT: {BRL: number, USDC: number};
    
}


type ContextType = {
    
    state: QuoteState
    dispatch: (action: Action) => void
    createConversionTable: (state:QuoteState) => ConversionTable | null
    operations: {
        convertToBrl: (state: QuoteState, value: number, currency: string) => number
    }

}


const QuoteContext = createContext<ContextType | undefined>(undefined);

const initialData: QuoteState = {

    usdc: [],
    usdt: [],
    brl: {},
    

}

enum QuoteActions {

    setBRLQuote,
    setUSDCQuote,
    setUSDTQuote,

}

const convertToBrl = (state: QuoteState, value: number, currency: string) => {

    switch(currency) {

        case 'USDT':
            return value * state.usdt[0]?.toBrl;
        case 'USDC':
            return value * state.usdc[0]?.toBrl;
        default: 
            return value;
            
    }

}

const operations = {convertToBrl}

const QuoteReducer = (state: QuoteState, action: Action) => {
    
    switch (action.type) {


        case QuoteActions.setBRLQuote:
            return {
                ...state,
                brl: action.payload.brl,
            };


        case QuoteActions.setUSDCQuote:
            return {
                ...state,
                usdc: action.payload.usdc,
            };

        case QuoteActions.setUSDTQuote:

            return {
                ...state,
                usdt: action.payload.usdt,
                
            }

        default:
            return state;
    }
};


const createConversionTable = (state:QuoteState) => {


    if(state.brl && state.usdc && state.usdt) {
        
                const conversionTable: ConversionTable = {
            
                    BRL: {
            
                      USDC: parseFloat(state.brl?.toUsdc ?? '0'),
                      USDT: parseFloat(state.brl?.toUsdt ?? '0'),
                      BRL:  state.brl?.toBrl ?? '0',
            
                    },
            
                    
                    USDC: {
            
                      BRL: parseFloat(state.usdc[0]?.toBrl ?? '0'),
                      USDT: parseFloat(state.usdc[0]?.toUsdt ?? '0'),
            
                    },
            
                    USDT: {
            
                      BRL: parseFloat(state.usdt[0]?.toBrl ?? '0'), 
                      USDC: parseFloat(state.usdt[0]?.toUsdc ?? '0'),
            
                    },
            
                  };
            
                  return conversionTable;

    } 

    return null;

}


const QuoteProvider = ({ children }: ProviderProps) => {

    const [state, dispatch] = useReducer(QuoteReducer, initialData);

    const value = {state, dispatch, createConversionTable, operations};

    return <QuoteContext.Provider value={value}>
                 {children}
        </QuoteContext.Provider>;
};


const useQuote = () => {
    const context = useContext(QuoteContext);

    if(context===undefined) {
        throw new Error('useQuote precisa ser usado dentro do quote provider')
    }

    return context;
}


export {useQuote, QuoteActions, QuoteProvider}

