

import ContainerService from "../Container/ContainerService";
import TransfersContainer from "../Container/TransfersContainer";
import {  useCurrency } from "../../context/CurrencyContext";
import { formatNumberToString } from "../../service/Formatters/FormatNumber/formatNumber";
import TextModel from "../Text/Text";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../../context/WebSocketContext";
import Heading from "../Heading/Heading";
import { isBrl } from "../../service/Util/isBrl";
import { transferController } from "../../controller/TransferController/transferController";
import { onChainController } from "../../controller/onChainController.ts/onChainController";
import Completed, { CompleteProps } from "../Completed/Completed";
import Loading from "../Loading/Loading";
import { isForWebSocketOnTransfer } from "../../service/WebSocketService/Transfer/isForWebSocket";
import { isBrlToBrl, isOnChain, neitherBrlAndUsd, usdToBrla } from "../../service/WebSocketService/WebSocketConstraints/webSocketContrainst";
import { FLEX, FLEX_COL, GAP_DEFAULT, HIDDEN, POINTS_ALL, POINTS_NONE } from "../../contants/classnames/classnames";
import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import { TO_WEBSOCKET } from "../../contants/divisionValues/divisionValues";
import { getBaseFee } from "../../controller/FeeController/getBaseFee";
import { TO_HOME, TO_TRANSFERS_1, TO_TRANSFERS_3 } from "../../contants/Paths/paths";

const TransferStep3 = () => {

    const {state} = useCurrency();

    const [component, setComponent] = useState<ReactNode>();
    const [quoteId, setQuoteId] = useState<number>(0);

    const [loading, showLoading] = useState(false);
    const [completed, showCompleted] = useState(false);

    const [success, onSuccess] = useState(false);
    const [error, onError] = useState(false);

    const [fee, setFee] = useState(0);

    const [errorMessage  ,setErrorMessage ] = useState<string>('');

    const [buttonClassname, setButtonClassname] = useState(POINTS_NONE);

    const [finalMessage, setFinalMessage] = useState<CompleteProps>({
        buttonText: '',
        completeMessage: '',
        text: '',
        path: '',
        image: '',
    });


    const {state:webSocketState} = useWebSocket();


    useEffect(()=> {

          
    if(!isForWebSocketOnTransfer(state)) {
      setButtonClassname(POINTS_ALL);
      }

    },[webSocketState.webSocket])


    const socketMessageHandler = () => {

      if(webSocketState.webSocket && webSocketState.webSocket.OPEN) {

          webSocketState.webSocket.onmessage = e => {

              const message = JSON.parse(e.data);
              
              if(message.error) {

                  setErrorMessage(message.error);
                  onError(true);  
                
              }

              console.log(message.data);
              
              
              if(message.data) {

                setQuoteId(message.data.quoteId);
                setButtonClassname(POINTS_ALL);

              }   


              if(message.data && message.success && message.data.quoteId === quoteId && 
                message.data.id) {
                
                onSuccess(true);
             
              }

                        
          }

      }

    }

      useEffect(() => {

        if(isForWebSocketOnTransfer(state)) {

          socketMessageHandler();

        }

        if(success || error) {
            setButtonClassname(HIDDEN);
        }

    }, [socketMessageHandler, buttonClassname, success, error]);

    useEffect(()=> {

      const getFee = async () => {
        const currencyFee = await getBaseFee();

        setFee(currencyFee.pixOutFee);
        
      }

      if(isBrlToBrl(state)){
        getFee();
      }

    },[fee]);
  
    useEffect(() => {

      if (success) {

          showCompleted(true);
          showLoading(false);
          setFinalMessage({
              buttonText: 'Concluir',
              completeMessage: 'Transferência concluída',
              text: 'Você pode monitorar suas transações através do dashboard inicial.',
              path: TO_HOME,
          });
          setButtonClassname(HIDDEN); 

      }
 
  }, [success]);
  
  useEffect(() => {

      if (error) {
       
          showCompleted(true);
          showLoading(false);
          setFinalMessage({
              buttonText: 'Voltar',
              path: TO_TRANSFERS_1,
              completeMessage: errorMessage,
              text: 'Realize a operação novamente',
              image: '/X-error.png',
          });
          setButtonClassname(HIDDEN); 
      }
      

  }, [error, errorMessage]);
  

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

            <TextModel content={`Wallet Address - ${formatWalletAddress(state.walletAddress)}`}/>
                     
          );
        
      }

    },[])


  const handleSubmit = async () => {

      
      setButtonClassname(POINTS_NONE);
      showLoading(true); 

      if(isOnChain(state)){

        showLoading(true);

        const data = {

          chain: 'Polygon',
          to: state.walletAddress,
          inputCoin: state.sendCurrency,
          outputCoin: state.receiveCurrency,
          value: parseInt((state.receiveValue * TO_WEBSOCKET).toFixed(2)) ,
          
        }

        try {

          await onChainController(data.chain, data.to,data.inputCoin, data.outputCoin, data.value);
          
          onSuccess(true);
          

        } catch(e:any) {

          
            setErrorMessage('Falha ao enviar dados');
            onError(true);

        }

      }

        if(isBrlToBrl(state)) {

          showLoading(true);

          try {

           await transferController(state.pixkey, state.taxId, ((state.receiveValue + fee) * 100));
           onSuccess(true);
 
            

          } catch(e:any) {

              setErrorMessage('Falha ao enviar dados')
              onError(true);

          }
          
        } 
      
        if(isForWebSocketOnTransfer(state)) {

          setButtonClassname(POINTS_NONE);
          showLoading(true); 

          if(neitherBrlAndUsd(state)) {
                  
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
              
          if(usdToBrla(state)){
            
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


  }


    return (


      <ContainerService path ={TO_HOME} linkText="Dashboard">

            <TransfersContainer buttonControl={buttonClassname} onSubmit={handleSubmit}
             buttonText = "Confirmar envio" activeIndex={2} location={TO_TRANSFERS_3}>

              {!loading && !completed && (

                  <>
                    <Heading content={"Confirmar envio"} />
                    
                    <div className="w-full text-3xl mt-3 mb-3">

                      {component}
                      
                      <div className={`${FLEX} ${FLEX_COL} ${GAP_DEFAULT}`}>

                        <div className="bg-slate-100 w-full p-5 text-3xl mt-3 mb-3">
                          <TextModel content={`valor enviado - 
                          ${formatNumberToString((state.sendValue))}${state.sendCurrency}`}/>
                        </div>

                        {isBrlToBrl(state) ? (

                          <div>
                            <TextModel content={`Taxa de transação - 
                            ${formatNumberToString(fee)} ${state.sendCurrency}`}/>
                          </div>

                        ) : <></>}

                        <div className="bg-slate-100 w-full p-5 text-3xl mt-3 mb-3">
                          <TextModel content={`valor a receber - 
                          ${formatNumberToString((state.receiveValue))}${state.receiveCurrency}`}/>
                        </div>

                      </div>
           

                    </div>

                  </>
                    
                )}

                {loading && <Loading text="Processando..." />}

                {completed && <Completed {...finalMessage} />}

              

            </TransfersContainer>

      </ContainerService>

    );
}

export default TransferStep3;