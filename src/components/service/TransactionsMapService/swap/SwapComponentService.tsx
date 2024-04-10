import { faArrowRight, faArrowRightArrowLeft, faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, ReactNode, SetStateAction } from "react";


export const margin = "mx-2";

export function controlAmount
    (success: boolean | undefined, setAmount: Dispatch<SetStateAction<ReactNode>>,
     isPaymentSwap: boolean, brlaAmount: string, usdAmount: string, isUsdToBrla: boolean, data:any) {

            if(data.isOnChain) {


                    if(data.isPaymentChain) {

                      setAmount(<>
                    
                         <FontAwesomeIcon icon={faMinus} />{data.outputValue} 
                        
                        
                      </>);

                    } 
                    else {

                    setAmount(<>
                    
                      {data.inputValue} <FontAwesomeIcon icon={faArrowRight} />
                      {data.outputValue} 
                      
                      </>);

                    }
  
              }

                if(isPaymentSwap) {

                  
        
          
                    if(isUsdToBrla && success) {
          
                        setAmount(
                            <>
                
                              {usdAmount} <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                              {brlaAmount} <FontAwesomeIcon icon={faArrowRight} /> {brlaAmount}{" "}
                    
                            </>
          
                          );
        
                    } else if (isUsdToBrla && !success) {
          
                      setAmount(
                        <>
            
                          {usdAmount} <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                          <FontAwesomeIcon className={margin} icon={faX} />
                          {brlaAmount} <FontAwesomeIcon icon={faArrowRight} /> {brlaAmount}{" "}
                
                        </>
          
                      );
          
                    }
          
           
                    if(!isUsdToBrla && success) {
          
                      setAmount(
                        <>
            
                          {brlaAmount} <FontAwesomeIcon className={margin} icon={faArrowRightArrowLeft} /> 
                          {usdAmount} <FontAwesomeIcon icon={faArrowRight} /> {usdAmount}{" "}
                
                        </>
          
                      );
          
                    } else if(!isUsdToBrla && !success) {
                      setAmount(
                        <>
            
                          {brlaAmount} <FontAwesomeIcon icon={faArrowRightArrowLeft} /> 
                          <FontAwesomeIcon className={margin} icon={faX} />
                          {usdAmount} <FontAwesomeIcon icon={faArrowRight} /> {usdAmount}{" "}
                
                        </>
          
                      );
                    }
          
                } 


                if(!isPaymentSwap && !data.isOnChain) {



                  
                        if(isUsdToBrla && success) {
                  
                            setAmount(
                              <>
                              {usdAmount} <FontAwesomeIcon icon={faArrowRight} />
                              {brlaAmount} 
                              </>
                            );
                  
                          } else if(!isUsdToBrla && success) {
                  
                            setAmount(<>
                            
                              {brlaAmount} <FontAwesomeIcon icon={faArrowRight} />
                              {usdAmount} 
                              
                              </>);
                          
                           }
                  
                          
                  
                          if(isUsdToBrla && !success) {
                  
                            setAmount(<>
                  
                              {usdAmount} <FontAwesomeIcon icon={faArrowRight} />
                              <FontAwesomeIcon className={margin} icon={faX}/>
                              {brlaAmount} 
                              
                              </>);
                  
                          } else if(!isUsdToBrla && !success) {
                  
                            setAmount(<>
                  
                              {brlaAmount} <FontAwesomeIcon icon={faArrowRight} />
                              <FontAwesomeIcon className={margin} icon={faX}/>
                              
                              </>);
                  
                          }
  
                
                }
        
          
                    
                  
                

        
        
   


}

export const controlSwapPending = 
(data: any, setPending: Dispatch<SetStateAction<boolean>>, 
  setSuccess: Dispatch<SetStateAction<boolean | undefined>>) => {

    if (data.feedback === null) {

      setPending(true);

    } else {

      setSuccess(data.feedback.success);
      setPending(false);
      
    }

}



export const controlSwapTextComponent = 
(pending: boolean, success: boolean | undefined, isPaymentSwap: boolean, data: any,
  setMessage: Dispatch<SetStateAction<string>>
  ) => {

 
    if (pending) {

      setMessage("Pendente...");

    } else if (success && data.isPaymentChain){

      setMessage(`Transferencia feita para ${data.transfers.taxId}`);
      
    } else if (success && data.accNumber) {

      setMessage(`Transferencia feita para ${data.transfers.taxId}`);

    } else if(success && isPaymentSwap) {

      setMessage(`Transferencia feita com sucesso`);

    } else if (success && !data.accNumber) {

      setMessage("Conversão realizada com sucesso");
      
    }  else if (!success && isPaymentSwap) {


      setMessage("Falha na transfêrencia");

    } else {

      setMessage("Erro ao realizar conversão");
    }

  

}


