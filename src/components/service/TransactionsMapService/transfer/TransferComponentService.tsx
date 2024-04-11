import { Dispatch, ReactNode, SetStateAction } from "react";
import { ExpectedPayoutData } from "../../../controller/ValuesListingController/getPayoutData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import { margin } from "../swap/SwapComponentService";
import { formatNumberToString } from "../../Formatters/FormatNumber/formatNumber";
import { TEXT_GRAY_500, TEXT_RED_600 } from "../../../contants/classnames/classnames";

export const controlTextComponent = (
    setTitle:  Dispatch<SetStateAction<string>>,
    setText: Dispatch<SetStateAction<string>>,
    setTaxId: Dispatch<SetStateAction<string>>,
    data: ExpectedPayoutData | any) => {

        setTitle(data.title);
    
        if(data.transfers && data.feedback && data.feedback.success === false) {
          
          setText('Falha na transferência ');
          setTaxId('');
          return;

        } 
          
          if(data.feedback && data.feedback.success === null || data.transfers === null) {

            setText('Pendente...');
            setTaxId('');

          } else {
                setTaxId(data.transfers.taxId);
          }

        


        

      


}

 
export const controlColor = (setColor: Dispatch<SetStateAction<string>>, data: ExpectedPayoutData | any) => {

  
  if(data.feedback !== null && data.feedback.success === false) {
    setColor(TEXT_RED_600);
  }

  if(!data.feedback || data.feedback.success === null) {
      setColor(TEXT_GRAY_500);
  }

} 




export const controlTransferAmount = (numberAmount: number, 
  setAmount: Dispatch<SetStateAction<ReactNode>>, data: ExpectedPayoutData | any) => {
   
    const formattedAmount = (formatNumberToString(numberAmount) + " " + data.outputCoin);
    const usdAmount = (formatNumberToString(data.usdAmount) + " " + data.inputCoin);

    
    if(!data.feedback) {

      setAmount(<>
                
              <FontAwesomeIcon icon={faMinus} /> 
              <FontAwesomeIcon className={margin} icon={faX} /> 
              {formattedAmount}{" "}

      </>);

    } else {

          if(data.usdToBrla) {

            if(data.feedback.success) {
              
              setAmount(<>

                  {usdAmount}{" "}
                  <FontAwesomeIcon icon={faArrowRight} /> 
                  {formattedAmount}{" "}
        
              </>);

            } else {

              setAmount(<>

                {usdAmount}{" "}
                <FontAwesomeIcon icon={faArrowRight} /> 
                <FontAwesomeIcon className={margin} icon={faX} /> 
                {formattedAmount}{" "}
      
            </>);

            }
            
          } else {
            
            if(!data.feedback.success) {
        
              setAmount(<>
        
                <FontAwesomeIcon icon={faMinus} /> 
                <FontAwesomeIcon className={margin} icon={faX} /> 
                {formattedAmount}{" "}
        
              </>);
        
            } else {
                  
              setAmount(
                <>
      
                <FontAwesomeIcon icon={faMinus} /> 
                {formattedAmount}{" "}
        
                </>
              );

              }
          

          }

    }




}


  
  