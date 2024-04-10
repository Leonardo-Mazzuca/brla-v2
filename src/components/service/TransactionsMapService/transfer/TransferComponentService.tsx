import { Dispatch, ReactNode, SetStateAction } from "react";
import { ExpectedPayoutData } from "../../../controller/ValuesListingController/getPayoutData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import { margin } from "../swap/SwapComponentService";
import { formatNumberToString } from "../../Formatters/FormatNumber/formatNumber";

export const controlTextComponent = (
    setTitle:  Dispatch<SetStateAction<string>>,
    setText: Dispatch<SetStateAction<string>>,
    setTaxId: Dispatch<SetStateAction<string>>,
    data: ExpectedPayoutData | any) => {

        setTitle(data.title);
    
        if(data.transfers && data.feedback && !data.feedback.success) {
          
          setText('Falha na transferência ');
          setTaxId('');

        } {
          
          if(data.transfers && !data.feedback  || !data.transfers.taxId) {
  
            setText('Pendente...');
            setTaxId('');
    
          } else {
              setTaxId(data.transfers.taxId);
          }

        }


        

      


}

 
export const controlColor = (setColor: Dispatch<SetStateAction<string>>, data: ExpectedPayoutData | any) => {

  
  if(data.feedback && !data.feedback.success) {
    setColor('text-red-500');
  }

  if(data.transfers && !data.transfers.taxId || !data.feedback) {
      setColor('text-gray-500');
  }

} 




export const controlTransferAmount = (numberAmount: number, 
  setAmount: Dispatch<SetStateAction<ReactNode>>, data: ExpectedPayoutData | any) => {
   
    const formattedAmount = (formatNumberToString(numberAmount) + " " + data.outputCoin);

    
    if(!data.feedback) {

      setAmount(<>

        <FontAwesomeIcon icon={faMinus} /> 
        <FontAwesomeIcon className={margin} icon={faX} /> 
        {formattedAmount}

      </>);

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


  
  