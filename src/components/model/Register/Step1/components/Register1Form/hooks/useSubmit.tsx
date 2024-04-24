import { FormActions, useRegister } from "../../../../../../../context/Register/FormContext"
import { Register1State, RegisterActions } from "../../../context/Register1Context";



export const useSubmit = () => {

    const {state, dispatch} = useRegister();


    enum RegisterCases {


        submitForPj,
        submitForPf,
        submitForRegnum,
  
    }

    const submitAsPf = ({...data}:Register1State) => {


        dispatch({

            type:FormActions.setPF,

            payload: {

                fullName: data.fullname,
                email: data.email,
                phone: data.phone,
                taxIdType: 'CPF',
                country: data.country,
                cpf: data.cpf,
                birthDate: data.birthDate


            }

        })
        

    }

    const submitAsPj = ({...data}:Register1State) => {


        dispatch({

            type:FormActions.setPJ,

            payload: {

                fullName: data.fullname,
                email: data.email,
                phone: data.phone,
                taxIdType: 'CNPJ',
                country: data.country,
                cpf: data.cpf,
                birthDate: data.birthDate,
                startDate: data.dataPJ?.at(0)?.startDate,
                companyName:  data.dataPJ?.at(0)?.companyName,
                cnpj:  data.dataPJ?.at(0)?.cnpj

            }

        })
        

    }

    const submitAsRegnum = ({...data}:Register1State) => {


        dispatch({

            type:FormActions.setRegnum,

            payload: {

                fullName: data.fullname,
                email: data.email,
                phone: data.dataRegnum?.regnumPhone,
                taxIdType: !data.dataPJ ? 'CPF' : 'CNPJ',
                country: data.country,
                regnum: data.dataRegnum?.documentType,
                birthDate: data.birthDate,
         
            }

        })
        

    }




    const submitEvents = (data:Register1State, cases:RegisterCases) => {


        switch(cases) {

            case RegisterCases.submitForPf:
                submitAsPf(data);
                break;
            case RegisterCases.submitForPj:
                submitAsPj(data)
                break;
            case RegisterCases.submitForRegnum:
                submitAsRegnum(data);
                break;

            default:
                throw new Error('Selecione um dos campos para submeter');
        }

    }
  


    return {
        submitEvents,
        RegisterCases
    }



}