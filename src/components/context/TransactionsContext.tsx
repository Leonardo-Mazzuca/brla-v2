
import { useContext, useReducer, createContext, ReactNode  } from "react";
import { ProviderProps } from "../types/Provider/Provider";


export type TransactionsState = {

    searchDate: string;
    data: any[]

}

export enum TransactionsActions {

    setSearchDate,
    setData,

}

type Action = {
    type: TransactionsActions;
    payload: any;
}

type ContextType = {
    state: TransactionsState
    dispatch: (action: Action) => void
}

const initialData :TransactionsState = {

    searchDate: '',
    data: [],
}

const TransactionsContext = createContext<ContextType | undefined>(undefined);



const transactionsReducer = (state: TransactionsState, action: Action) => {

    switch(action.type) {

        case TransactionsActions.setSearchDate:
            return {...state, searchDate: action.payload.searchDate};
        case TransactionsActions.setData:
            return {...state, data: action.payload.data};
        default: 
             return state;
    }

}

export const TransactionsProvider = ({children}: ProviderProps) => {

    const [state, dispatch] = useReducer(transactionsReducer,initialData);

    const value = {state,dispatch};

    return (

        <TransactionsContext.Provider value={value}>

                {children}

        </TransactionsContext.Provider>
    );

}

export const useValuesFilter = () => {

    const context = useContext(TransactionsContext);

    if(context===undefined) {
        throw new Error('useValuesFilter precisa ser usado dentro do values provider')
    }

    return context;

}