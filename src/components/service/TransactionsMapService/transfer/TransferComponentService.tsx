import { Dispatch, ReactNode, SetStateAction } from "react";
import { ExpectedPayoutData } from "../../../controller/ValuesListingController/getPayoutData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import { margin } from "../swap/SwapComponentService";

export const controlTextComponent = (
    setTitle:  Dispatch<SetStateAction<string>>,
    setText: Dispatch<SetStateAction<string>>,
    setTaxId: Dispatch<SetStateAction<string>>,
    data: ExpectedPayoutData | any) => {

        const title = data.title;
        setTitle(title);
    
        if(data.transfers !== null && data.feedback !== null && !data.feedback.success) {
          
          
          setText('Falha na transferência ');
          setTaxId('');

        } 

        if(data.transfers && !data.transfers.taxId) {

          setText('Pendente...');
          setTaxId('');

        } else {
            setTaxId(data.transfers.taxId);
        }



}

 
export const controlColor = (setColor: Dispatch<SetStateAction<string>>, data: ExpectedPayoutData | any) => {

  
  if(data.feedback && !data.feedback.success) {
    setColor('text-red-500');
  }

  if(data.transfers && !data.transfers.taxId && !data.transfers.amount) {
      setColor('text-gray-500');
  }

} 




export const controlTransferAmount = (formattedAmount: string, 
  setAmount: Dispatch<SetStateAction<ReactNode>>, data: ExpectedPayoutData | any) => {

    if(data.transfers && !data.transfers.amount) {

      setAmount("00,00");

    }

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


  
  