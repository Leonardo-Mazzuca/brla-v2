import { useState } from "react";
import { isCnpj } from "../../../../../../../functions/TaxId/Cnpj/verifyCnpj";
import { formatValueInCnpj } from "../../../../../../../functions/Formatters/formatValueInCnpj";
import { useRegisterForStep1 } from "../../../context/Register1Context";
import { isRegnum } from "../functions/isRegnum";



export const useCnpj = () => {


    const [cnpj, setCnpj] = useState('');
    const {state} = useRegisterForStep1();

    const handleCnpjChange = (e:React.ChangeEvent<HTMLInputElement>) =>{

        setCnpj(e.target.value);

    }

    const handleCnpjValidation =(cnpj:string)=> {

      if(isRegnum(state.country)) {
        return true;

      } else {

          if(isCnpj(cnpj)) {
            setCnpj(formatValueInCnpj(cnpj));
            return true;
          }
    
          return false;
    
        }

      }
  

    return {
        
        cnpj,
        setCnpj,
        handleCnpjChange,
        handleCnpjValidation
    }


}