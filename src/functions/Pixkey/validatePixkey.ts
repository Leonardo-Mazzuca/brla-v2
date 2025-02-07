import { Dispatch, SetStateAction } from "react";


import { formatValueInCnpj } from "../Formatters/formatValueInCnpj";
import { formatValueInCpf } from "../Formatters/formatValueInCpf";
import { BLOCK, HIDDEN } from "../../contants/classnames/classnames";
import { formatValueInPhoneNumber } from "../Formatters/FormatPhoneNumber/formatValueInPhoneNumber";
import { isCpf } from "../TaxId/Cpf/verifyCpf";
import { isCnpj } from "../TaxId/Cnpj/verifyCnpj";
import { isPhoneNumber, validityRawPhoneNumber } from "../TaxId/PhoneNumber/verifyPhoneNumber";
import { isEmail } from "./verifyEmail";
import { isRandomKey } from "./verifiyRandomkey";



export const validatePixkey = (pixkey: string, setPixkeyValue: Dispatch<SetStateAction<string>>, 
     setTaxIdClassname: Dispatch<SetStateAction<string>>, setIsPixkeyValid: Dispatch<SetStateAction<boolean>>,
     controlPixkey: Dispatch<SetStateAction<boolean>>)  => {

        if(pixkey === '') {
        
            setPixkeyValue(pixkey);
            setTaxIdClassname(HIDDEN);
            setIsPixkeyValid(false);
            controlPixkey(false)
            return;
    
          } else {
    
       
    
            if(isCpf(pixkey)) {
    
              controlPixkey(true)
              setPixkeyValue(formatValueInCpf(pixkey))
        
            }
    
            if(isCnpj(pixkey)) {
    
              controlPixkey(true)
              setPixkeyValue(formatValueInCnpj(pixkey))
      
            }
    
            if(validityRawPhoneNumber(pixkey) && !(isCpf(pixkey) || isCnpj(pixkey))) {
    
                  setPixkeyValue(formatValueInPhoneNumber(pixkey))
              
            }
    
            if(isEmail(pixkey)) {
              setPixkeyValue(pixkey);
            }
    
            if(isRandomKey(pixkey)) {
              setPixkeyValue(pixkey)
            }
    
            if(isCpf(pixkey) || isCnpj(pixkey)) {
              
              setTaxIdClassname(HIDDEN);
              controlPixkey(true);
              
            } else {
    
              setTaxIdClassname(BLOCK);
              controlPixkey(false);
    
            }
    
            const isValid = isCpf(pixkey) || isCnpj(pixkey) || isPhoneNumber(pixkey) || isEmail(pixkey) || isRandomKey(pixkey);

            setIsPixkeyValid(isValid);
            return isValid;
        
          }
        
}