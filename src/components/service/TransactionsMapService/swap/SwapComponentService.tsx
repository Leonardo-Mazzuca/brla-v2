import { faArrowRight, faArrowRightArrowLeft, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, ReactNode, SetStateAction } from "react";

export const margin = "mx-2";

export function controlAmount
    (success: boolean | undefined, setAmount: Dispatch<SetStateAction<ReactNode>>,
     isPaymentSwap: boolean, brlaAmount: string, usdAmount: string, isUsdToBrla: boolean, data:any) {


        if(data.outputCoin && data.inputCoin) {
          
                  if(data.inputCoin === 'USDC' && data.outputCoin === 'USDT') {
            
                    setAmount(<>
                    
                      {brlaAmount} <FontAwesomeIcon icon={faArrowRight} />
                      {usdAmount} 
                      
                      </>);
            
                  } 
            
                  if(data.inputCoin === 'USDT' && data.outputCoin === 'USDC') {
            
                    setAmount(<>
                    
                      {usdAmount} <FontAwesomeIcon icon={faArrowRight} />
                      {brlaAmount} 
                      
                      </>);
                      
                    }
             
        }


  
          
        
                // if(isPaymentSwap) {
        
          
                //     if(isUsdToBrla && success) {
          
                //         setAmount(
                //             <>
                
                //               {usdAmount} <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                //               {brlaAmount} <FontAwesomeIcon icon={faArrowRight} /> {brlaAmount}{" "}
                    
                //             </>
          
                //           );
        
                //     } else if (isUsdToBrla && !success) {
          
                //       setAmount(
                //         <>
            
                //           {usdAmount} <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                //           <FontAwesomeIcon className={margin} icon={faX} />
                //           {brlaAmount} <FontAwesomeIcon icon={faArrowRight} /> {brlaAmount}{" "}
                
                //         </>
          
                //       );
          
                //     }
          
           
                //     if(!isUsdToBrla && success) {
          
                //       setAmount(
                //         <>
            
                //           {brlaAmount} <FontAwesomeIcon className={margin} icon={faArrowRightArrowLeft} /> 
                //           {usdAmount} <FontAwesomeIcon icon={faArrowRight} /> {usdAmount}{" "}
                
                //         </>
          
                //       );
          
                //     } else if(!isUsdToBrla && !success) {
                //       setAmount(
                //         <>
            
                //           {brlaAmount} <FontAwesomeIcon icon={faArrowRightArrowLeft} /> 
                //           <FontAwesomeIcon className={margin} icon={faX} />
                //           {usdAmount} <FontAwesomeIcon icon={faArrowRight} /> {usdAmount}{" "}
                
                //         </>
          
                //       );
                //     }
          
                // } 


                // if(!isPaymentSwap) {

                  
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
  
                
                // }
        
          
                    
                  
                

        
        
   


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

    } else if (success && data.accNumber) {

      setMessage(`Transferencia feita para ${data.accNumber}`);

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
