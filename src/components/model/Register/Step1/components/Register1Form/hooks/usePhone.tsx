import { useState } from "react";
import { formatValueInPhoneNumber } from "../../../../../../../functions/Formatters/FormatPhoneNumber/formatValueInPhoneNumber";
import { validityRawPhoneNumber } from "../../../../../../../functions/TaxId/PhoneNumber/verifyPhoneNumber";



export const usePhone = () => {


    const [phone, setPhone] = useState('');

        
    const handlePhoneChange = (e:React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        setPhone(value);
  
    }

    
    const handlePhoneValidation = (phone:string) => {

        if(validityRawPhoneNumber(phone)){
          
          setPhone(formatValueInPhoneNumber(phone))
    
          return true;
        }
  
        return false;
    
      }



    return {

        phone,
        setPhone,
        handlePhoneChange,
        handlePhoneValidation,


    }




}