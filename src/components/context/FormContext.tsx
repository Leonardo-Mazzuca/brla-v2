

import { useContext, useReducer, createContext, ReactNode  } from "react";
import { FormState } from '../types/State/State';
import { ProviderProps } from "../types/Provider/Provider";


type Action = {
    type: FormActions;
    payload: any;
}

type ContextType = {
    state: FormState
    dispatch: (action: Action) => void
}

const FormContext = createContext<ContextType | undefined>(undefined);

const initialData: FormState = {

        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        cpf: '',
        birthDate: '',
        taxIdType: 'CPF',
    
        address: {
          cep: '',
          city: '',
          state: '',
          street: '',
          number: '',
          district: '',
          complement: '',
          country: '',
        },
    
       cnpj: '',
       companyName: '',
       startDate: '',
      


}

export enum FormActions {

    setPJ,
    setPF,
    setStep1,
    setStep2,
    setStep3,
    setStep4,



}



const formReducer = (state: FormState, action: Action) => {
    switch (action.type) {



        case FormActions.setPF:
            return {

                ...state,
                fullName: action.payload.fullName,
                email: action.payload.email,
                phone: action.payload.phone,
                taxIdType: action.payload.taxIdType,
                country: action.payload.country,
                cpf: action.payload.cpf,
                birthDate: action.payload.birthDate,
             
                


            };
        case FormActions.setPJ:
            return {

                ...state,
                email: action.payload.email,
                phone: action.payload.phone,
                taxIdType: action.payload.taxIdType,
                country: action.payload.country,
                cpf: action.payload.cpf,
                startDate: action.payload.startDate,
                companyName: action.payload.companyName,
                cnpj: action.payload.cnpj,
                birthDate: action.payload.birthDate,

             


            };


        case FormActions.setStep2:
            return {
                ...state,
                address: {
                    country: action.payload.country,
                    cep: action.payload.cep,
                    city: action.payload.city,
                    state: action.payload.state,
                    street: action.payload.street,
                    number: action.payload.number,
                    district: action.payload.district,
                    complement: action.payload.complement
                }
            };


        case FormActions.setStep3:
                return {
                    ...state,
                    password: action.payload.password,
                    confirmPassword: action.payload.confirmPassword
                };

        case FormActions.setStep4:
            return { ...state, token: action.payload.token };


        default:
            return state;
    }
};
    
   


export const FormProvider = ({children}: ProviderProps) => {

    const [state, dispatch] = useReducer(formReducer, initialData);
    const value = {state, dispatch};

    return (

        <FormContext.Provider value={value}>

            {children}

        </FormContext.Provider>

    )

}


export const useForm = () => {

    const context = useContext(FormContext);

    if(context===undefined) {
        throw new Error('useForm precisa ser usado dentro do form provider')
    }

    return context;
    
}


