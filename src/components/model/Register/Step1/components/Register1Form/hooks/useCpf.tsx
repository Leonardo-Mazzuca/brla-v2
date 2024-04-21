import { useState } from "react";
import { isCpf } from "../../../../../../../functions/TaxId/Cpf/verifyCpf";
import { formatValueInCpf } from "../../../../../../../functions/Formatters/formatValueInCpf";
import { useRegisterForStep1 } from "../../../context/Register1Context";
import { isRegnum } from "../functions/isRegnum";


export const useCpf = () => {



    const [cpf, setCpf] = useState('');
    const {state} = useRegisterForStep1();
        
    const handleCpfChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        
        setCpf(e.target.value)
  
    } 


    const handleCpfValidation = (cpf:string) => {

        if(isRegnum(state.country)) {

          return true;

        } else {

          if(isCpf(cpf)) {
    
            setCpf(formatValueInCpf(cpf))
            return true;
    
          }
    
          return false;

        }
  
  
      }


    return {

        cpf,
        setCpf,
        handleCpfChange,
        handleCpfValidation
        
    }


  


}