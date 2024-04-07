

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
import { getCurrencyCoinToFormat } from "../../service/CoinsService/getCurrencyCoinToFormat";
import { onChainController } from "../../controller/onChainController.ts/onChainController";
import Completed, { CompleteProps } from "../Completed/Completed";
import Loading from "../Loading/Loading";
import { isForWebSocketOnTransfer } from "../../service/WebSocketService/Transfer/isForWebSocket";
import { isBrlToBrl, isOnChain, neitherBrlAndUsd, usdToBrla } from "../../service/WebSocketService/WebSocketConstraints/webSocketContrainst";
import { FLEX, GAP_DEFAULT, HIDDEN, POINTS_ALL, POINTS_NONE } from "../../contants/classnames/classnames";
import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";

const TransferStep3 = () => {

    const {state} = useCurrency();

    const [component, setComponent] = useState<ReactNode>();
    const [quoteId, setQuoteId] = useState<number>(0);

    const [loading, showLoading] = useState(false);
    const [completed, showCompleted] = useState(false);

    const [success, onSuccess] = useState(false);
    const [error, onError] = useState(false);


    const [errorMessage  ,setErrorMessage ] = useState<string>('');

    const [buttonClassname, setButtonClassname] = useState(POINTS_NONE);

    const [onSuccessMessage, setSuccessMessage] = useState<CompleteProps>({
        buttonText: '',
        completeMessage: '',
        text: '',
        path: '',
        image: '',
    });


    const {state:webSocketState} = useWebSocket();

    const navigate = useNavigate();


    useEffect(()=> {

      if(!state.receiveValue) {
        navigate('/home');
      }
      
    },[]);


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
              
              if(message.data) {

                setQuoteId(message.data.quoteId);
                setButtonClassname(POINTS_ALL);

              }   

              console.log(message);

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
  
    useEffect(() => {

      if (success) {

          showCompleted(true);
          showLoading(false);
          setSuccessMessage({
              buttonText: 'Concluir',
              completeMessage: 'Transferência concluída',
              text: 'Você pode monitorar suas transações através do dashboard inicial.',
              path: '/home',
          });
          setButtonClassname(HIDDEN); 

      }
 
  }, [success]);
  
  useEffect(() => {

      if (error) {
       
          showCompleted(true);
          showLoading(false);
          setSuccessMessage({
              buttonText: 'Voltar',
              path: '/transfer/1',
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
          value: parseFloat(state.receiveValue.toFixed(2)) * 100,
          
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

           await transferController(state.pixkey, state.taxId, (state.receiveValue * 100));
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


      <ContainerService path = "/home" linkText="Dashboard">

            <TransfersContainer buttonControl={buttonClassname} onSubmit={handleSubmit}
             buttonText = "Confirmar envio" activeIndex={2} location="/transfer/3">

              {!loading && !completed && (

                  <>
                    <Heading content={"Confirmar envio"} />
                    
                    <div className="bg-slate-100 w-full p-5 text-3xl mt-3 mb-3">

                      {component}
                      
                      <div className={`${FLEX} ${GAP_DEFAULT}`}>

                        <TextModel content={`valor enviado - 
                        ${formatNumberToString((state.sendValue), 
                        getCurrencyCoinToFormat(state.sendCurrency))}`}/>

                        <TextModel content={`valor a receber - 
                        ${formatNumberToString((state.receiveValue), 
                        getCurrencyCoinToFormat(state.receiveCurrency))}`}/>

                      </div>

           

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