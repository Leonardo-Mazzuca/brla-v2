import { createContext, useContext, useReducer } from "react"
import { ProviderProps } from "../../../../../@types/Provider/Provider";


export type dataPJ = {

    companyName: string;
    startDate: string;
    cnpj: string;

}

export type DataRegnum = {
    documentType: string;
    regnumPhone:string;
}
 
export type Register1State = {

    fullname:string
    phone : string,
    isPJ: boolean,
    email: string,
    country: string,
    birthDate: string;
    cpf: string;
    dataPJ: dataPJ[] | null;
    dataRegnum: DataRegnum | null

}

enum RegisterActions  {

    setIsPJ,
    setPjData,
    setData,
    setCountry,


}

type ContextType = {
    state:Register1State,
    dispatch: (action:Action) => void,
}

type Action = {
    type: RegisterActions,
    payload: any,
}


const Register1Context = createContext<ContextType | undefined>(undefined);

const initialData : Register1State = {

    fullname: '',
    phone: '',
    isPJ: false,
    email: '',
    country: 'Brasil',
    birthDate: '',
    cpf: '',
    dataPJ: null,
    dataRegnum: null

}

const registerReducer = (state:Register1State, action:Action) => {


    switch(action.type){

        case RegisterActions.setIsPJ:
            return {
                ...state,
                isPJ: action.payload.isPJ
            }

        case RegisterActions.setPjData:
            return {
                ...state,
                dataPJ: action.payload.dataPJ
            }
        case RegisterActions.setData:
            return {
                ...state,
                data: action.payload.data
            }
            
        case RegisterActions.setCountry:
            return {
                ...state,
                country: action.payload.country
            }

        default:
            return {...state}

    }



}

const Register1Provider = ({children}:ProviderProps) => {

    const [state,dispatch] = useReducer(registerReducer, initialData);

    const value = {state, dispatch};


    return (

        <Register1Context.Provider value={value}>
            {children}
        </Register1Context.Provider>
        
    );

}


const useRegisterForStep1 = () => {

    const context = useContext(Register1Context);

    if(context===undefined){

        throw new Error('useRegister precisa ser usado dentro do register 1 provider')

    }

    return context;


}

export {useRegisterForStep1,RegisterActions, Register1Provider}
