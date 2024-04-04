

import ContainerService from "../Container/ContainerService";
import TransfersContainer from "../Container/TransfersContainer";
import {  useCurrency } from "../../context/CurrencyContext";
import { formatNumberToString } from "../../service/Formatters/FormatNumber/formatNumber";
import TextModel from "../Text/Text";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../../context/WebSocketContext";
import Heading from "../Heading/Heading";
import { fetchWebSocket } from "../../service/WebSocketService/fetchWebSocket";
import { isBrl } from "../../service/Util/isBrl";
import { transferController } from "../../controller/TransferController/transferController";
import { getCurrencyCoinToFormat } from "../../service/CoinsService/getCurrencyCoinToFormat";
import { sendCoinToWebSocket } from "../../service/CurrencyService/sendCoinToWebSocket";
import { isUsdToBrla } from "../../service/Util/isUsdToBrla";
import { isUsdcToUsdt, isUsdtToUsdc } from "../../service/Util/onChain";
import { onChainController } from "../../controller/onChainController.ts/onChainController";
import { isTheSameCoin } from "../../service/OperationValidities/operationValidities";

const TransferStep3 = () => {

    const {state} = useCurrency();
    const [component, setComponent] = useState<ReactNode>();
    const [quoteId, setQuoteId] = useState(0);

    const {state:webSocketState, dispatch} = useWebSocket();

    const navigate = useNavigate();

    const isForWebSocket = 
    (!isUsdcToUsdt(state) && !isUsdtToUsdc(state) && 
    (!state.sendCurrency === !state.receiveCurrency) && 
    (!isTheSameCoin(state.sendCurrency, state.receiveCurrency)));

    useEffect(()=> {

      if(!state.receiveValue) {
        navigate('/home');
      }
      
    },[]);

    useEffect(() => {

        if(isForWebSocket) {
          fetchWebSocket(webSocketState, dispatch);
        }
        
    }, [webSocketState.webSocket]);

    useEffect(()=> {

      if(isBrl(state)) {

        setComponent( 

          <>
            <TextModel content={`Chave pix - ${state.pixkey}`} />
            <TextModel content={`TaxId - ${state.taxId}`}/>
          </>

        )  

      } else {
        
          setComponent(

            <TextModel content={`Wallet Address - ${state.walletAddress}`}/>
                     
          );
        
      }

    },[])

    
    const socketMessageHandler = () => {

      if(webSocketState.webSocket && webSocketState.webSocket.OPEN) {

          webSocketState.webSocket.onmessage = e => {

              const message = JSON.parse(e.data);
              
   
              
              if(message.error) {

        
                  // setSuccessMessage({
                  //     buttonText: 'Voltar',
                  //     path: '/convert/1',
                  //     completeMessage: 'Um erro ocorreu',
                  //     text: 'Realize a operação novamente'

                  // });

                  // onError(true);
                  // showCompleted(true);
                  // showLoading(false);
                  // setButtonClassname(hidden);

                  
              }

              
              
              if(message.data) {

                setQuoteId(message.data.quoteId);

              }   

              console.log(message);
              
              
          }


          

          

      }
  }

  useEffect(()=> {

    console.log(state.sendCurrency);
    
    console.log(state.receiveCurrency);
    

   

    if(isForWebSocket) {

              setTimeout(()=> {
      
              if (webSocketState.webSocket && webSocketState.webSocket.OPEN) {
                  
                  webSocketState.webSocket.send(JSON.stringify({
      
                      messageId: 'qualquer',
                      operation: 'Quote',
      
                      data: {
                          
                          amount: (state.sendValue * 100),
                  
                          chain: 'Polygon',
      
                          coin: sendCoinToWebSocket(state.receiveCurrency),
                       
                          usdToBrla: isUsdToBrla(state.sendCurrency, state.receiveCurrency),
  
                          fixOutPut: state.fixOutput,
      
                          operation: !isUsdToBrla(state.sendCurrency, state.receiveCurrency)
                           ? 'swap' : 'pix-to-usd',
      
                          
                      }
      
                  }));
      
              }
      
          },1200);

          socketMessageHandler();

    } 
    
  },[webSocketState.webSocket]);

  const handleSubmit = async () => {

    const isUsdcOrUsdt = isUsdcToUsdt(state) || isUsdtToUsdc(state);
    const sameCoin = isTheSameCoin(state.sendCurrency, state.receiveCurrency);
    const notIsBrlAndNotIsUsdtOrUsdt = !isBrl(state) && (!isUsdcToUsdt(state) && !isUsdtToUsdc(state));
    const usdToBrla = isUsdToBrla(state.sendCurrency, state.receiveCurrency);
    const isUsdcAndUsdt = isUsdcToUsdt(state) && isUsdtToUsdc(state);

    if(isUsdcOrUsdt){

      const data = {

        chain: 'Polygon',
        to: state.walletAddress,
        inputCoin: state.sendCurrency,
        outputCoin: state.receiveCurrency,
        value: parseFloat(state.receiveValue.toFixed(2)) * 100,
        
      }

      try {

        await onChainController(data.chain, data.to,data.inputCoin, data.outputCoin, data.value);

      } catch(e:any) {

      }

    }

    if(sameCoin) {

      try {

        const response = await transferController(state.pixkey, state.taxId, (state.receiveValue * 100));

        if(response) {

          console.log('Sucesso');
          
        }

      } catch(e:any) {

      }
      
    } 
      
    if(notIsBrlAndNotIsUsdtOrUsdt) {
            
        webSocketState.webSocket?.send(JSON.stringify({
      
            messageId: "qualquer",
            operation: "PlaceSwapOrder",
            data: {
      
                quoteId:quoteId,
                notifyEmail:true,
                receiverWallet: state.walletAddress,
                // otp: data.code_1+data.code_2+data.code_3+data.code_4+data.code_5+data.code_6
            }}));
      
    } 
          
    if(usdToBrla){
      
          webSocketState.webSocket?.send(JSON.stringify({
            messageId: "qualquer",
            operation: "PlaceUsdToPixOrder",
            data: {
      
                quoteId:quoteId,
                notifyEmail:true,
                pixKey:state.pixkey,
                taxId: state.taxId
                // otp: data.code_1+data.code_2+data.code_3+data.code_4+data.code_5+data.code_6
              }}));
      
        }

  }


    return (


      <ContainerService path = "/home" linkText="Dashboard">

            <TransfersContainer onSubmit={handleSubmit}
             buttonText = "Confirmar envio" activeIndex={2} location="/transfer/3">


                    <Heading content={"Confirmar envio"} />
                    
                    <div className="bg-slate-100 p-5 text-3xl mt-3">

                      {component}
                      
                      <TextModel content={`valor a ser enviado - 
                      ${formatNumberToString((state.receiveValue), 
                      getCurrencyCoinToFormat(state.receiveCurrency))}`}/>

                    </div>
                    

            </TransfersContainer>

      </ContainerService>

    );
}

export default TransferStep3;