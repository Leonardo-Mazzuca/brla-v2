

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
import { onChainController } from "../../controller/onChainController.ts/onChainController";
import Completed, { CompleteProps } from "../Completed/Completed";
import { hidden, pointsAll, pointsNone } from "../../types/Button/buttonVariables";
import Loading from "../Loading/Loading";
import { isForWebSocket } from "../../service/WebSocketService/Transfer/isForWebSocket";
import { isBrlToBrl, isOnChain, neitherBrlAndUsd, usdToBrla } from "../../service/WebSocketService/WebSocketConstraints/webSocketContrainst";
import { sendMessageToTransfers } from "../../service/WebSocketService/sendMessageToTransfers";

const TransferStep3 = () => {

    const {state} = useCurrency();

    const [component, setComponent] = useState<ReactNode>();
    const [quoteId, setQuoteId] = useState<number>(0);

    const [loading, showLoading] = useState(false);
    const [completed, showCompleted] = useState(false);

    const [success, onSuccess] = useState(false);
    const [error, onError] = useState(false);


    const [errorMessage  ,setErrorMessage ] = useState('');

    const [buttonClassname, setButtonClassname] = useState(pointsNone);

    const [onSuccessMessage, setSuccessMessage] = useState<CompleteProps>({
        buttonText: '',
        completeMessage: '',
        text: '',
        path: '',
    });


    const {state:webSocketState, dispatch} = useWebSocket();

    const navigate = useNavigate();


    useEffect(()=> {

      if(!state.receiveValue) {
        navigate('/home');
      }
      
    },[]);


    useEffect(() => {
      

        if(isForWebSocket(state)) {

          fetchWebSocket(webSocketState, dispatch);

        } else {

          setButtonClassname(pointsAll);

        }
        
    }, [webSocketState.webSocket]);


    const socketMessageHandler = () => {

      if(webSocketState.webSocket && webSocketState.webSocket.OPEN) {

          webSocketState.webSocket.onmessage = e => {

              const message = JSON.parse(e.data);
              
   
              if(message.error) {
                  setErrorMessage(message.error);
                  onError(true);
                  setButtonClassname(hidden);
              }

              
              if(message.data) {

                setQuoteId(message.data.quoteId);

              }   

              if(message.data && message.success && message.data.quoteId === quoteId) {
                setButtonClassname(hidden);
                onSuccess(true);
             
              }

              console.log(message);
                        
          }

          
          if(webSocketState.webSocket && quoteId && !error) {
            setButtonClassname(pointsAll);
          }
          


      }
  }



    useEffect(() => {

      if (isForWebSocket(state)) {
          socketMessageHandler();
      }

  }, [isForWebSocket, socketMessageHandler]);
  
    useEffect(() => {

        if (success) {

            showLoading(false);
            showCompleted(true);
            setButtonClassname(hidden);
            setSuccessMessage({
                buttonText: 'Concluir',
                completeMessage: 'Transferência concluída',
                text: 'Você pode monitorar suas transações através do dashboard inicial.',
                path: '/home',
            });
        }
        
    }, [success]);
  
    useEffect(() => {
        if (error) {
            showCompleted(true);
            showLoading(false);
            setButtonClassname(hidden);
            setSuccessMessage({
                buttonText: 'Voltar',
                path: '/transfer/1',
                completeMessage: errorMessage,
                text: 'Realize a operação novamente'
            });
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

            <TextModel content={`Wallet Address - ${state.walletAddress}`}/>
                     
          );
        
      }

    },[])


  useEffect(()=> {
   

    if(isForWebSocket(state) && webSocketState.webSocket) {
      
              sendMessageToTransfers(state, webSocketState.webSocket);

    } 
    
  },[webSocketState.webSocket]);

  const handleSubmit = async () => {

      setButtonClassname(pointsNone);

      if(isOnChain(state)){

        showLoading(true);

        const data = {

          chain: 'Polygon',
          to: state.walletAddress,
          inputCoin: state.sendCurrency,
          outputCoin: state.receiveCurrency,
          value: parseFloat(state.receiveValue.toFixed(2)) * 100,
          
        }

        try {

          await onChainController(data.chain, data.to,data.inputCoin, data.outputCoin, data.value);
          
          onSuccess(true);
          setButtonClassname(hidden);
          showLoading(false);
          showCompleted(true);

          
        } catch(e:any) {

          
            setErrorMessage('Falha ao enviar dados');
            onError(true);

        }

      }

        if(isBrlToBrl(state)) {

          showLoading(true);

          try {

            const response = await transferController(state.pixkey, state.taxId, (state.receiveValue * 100));

            console.log('Resposta de moeda para mesma moeda :', response);

            if(response) {

              onSuccess(true);
              showLoading(false);
              showCompleted(true);
              
            }

          } catch(e:any) {

              setErrorMessage('Falha ao enviar dados')
              onError(true);

          }
          
        } 
      
        if(isForWebSocket(state)) {

          if(neitherBrlAndUsd(state)) {
    
            setButtonClassname(pointsNone);
            showLoading(true);   
                  
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
    
            setButtonClassname(pointsNone);
            showLoading(true);   
            
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


      <ContainerService path = "/home" linkText="Dashboard">

            <TransfersContainer buttonControl={buttonClassname} onSubmit={handleSubmit}
             buttonText = "Confirmar envio" activeIndex={2} location="/transfer/3">

              {!loading && !completed && (

                  <>
                    <Heading content={"Confirmar envio"} />
                    
                    <div className="bg-slate-100 p-5 text-3xl mt-3">

                      {component}
                      
                      <TextModel content={`valor a ser enviado - 
                      ${formatNumberToString((state.receiveValue), 
                      getCurrencyCoinToFormat(state.receiveCurrency))}`}/>

                    </div>
                  </>
                    
                )}

                {loading && <Loading text="Processando..." />}

                {completed && <Completed {...onSuccessMessage} />}

              

            </TransfersContainer>

      </ContainerService>

    );
}

export default TransferStep3;