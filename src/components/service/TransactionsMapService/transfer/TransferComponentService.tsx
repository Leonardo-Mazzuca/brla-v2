import { Dispatch, ReactNode, SetStateAction } from "react";
import { ExpectedPayoutData } from "../../../controller/ValuesListingController/getPayoutData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import { margin } from "../swap/SwapComponentService";

export const controlTextComponent = (
    setTitle:  Dispatch<SetStateAction<string>>,
    setText: Dispatch<SetStateAction<string>>,
    setAccNumber: Dispatch<SetStateAction<string>>,
    

    data: ExpectedPayoutData | any) => {

        const title = data.title;
        const accNumber = data.accountNumber;
    
        if(data.feedback && !data.feedback.success) {
          
          setTitle(title);
          setText('Falha na transferência ');
          setAccNumber('');

        } else {

           
            setTitle(title);
            setAccNumber(accNumber);
          
    
        }



}

 
export const controlColor = (setColor: Dispatch<SetStateAction<string>>,amount: ReactNode, data: any) => {

  
  if(data.feedback && !data.feedback.success) {
    setColor('text-red-500');
  }

  if(amount === "0") {
      setColor('text-gray-500');
  }

} 




export const controlTransferAmount = (formattedAmount: string, 
  setAmount: Dispatch<SetStateAction<ReactNode>>, data: any) => {

  
    if(data.feedback && !data.feedback.success) {

      setAmount(<>

        <FontAwesomeIcon icon={faMinus} /> 
        <FontAwesomeIcon className={margin} icon={faX} /> 
        {formattedAmount}

      </>);

    } 
  
    if(data.feedback && data.feedback.success)  {

        setAmount(
          <>

          <FontAwesomeIcon icon={faMinus} /> 
          {formattedAmount}  
  
          </>
        );



    }

}


  
  