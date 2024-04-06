import React, { useEffect, useState } from "react";
import ContainerService from "../Container/ContainerService";
import ConversionContainer from "../Container/ConversionContainer";
import { useCurrency } from "../../context/CurrencyContext";
import TextModel from "../Text/Text";
import ConversionCard from "./ConversionCard/ConversionCard";
import IconBall from "../IconBall/IconBall";
import Loading from "../Loading/Loading";
import Completed, { CompleteProps } from "../Completed/Completed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useWebSocket } from "../../context/WebSocketContext";
import { fetchWebSocket } from "../../service/WebSocketService/fetchWebSocket";
import { hidden, pointsAll, pointsNone } from "../../types/Button/buttonVariables";
import { useQuote } from "../../context/QuoteContext";
import { formatNumberToString } from "../../service/Formatters/FormatNumber/formatNumber";
import { sendCoinToWebSocket } from "../../service/CurrencyService/sendCoinToWebSocket";
import { isUsdcToUsdt, isUsdtToUsdc } from "../../service/Util/onChain";
import { onChainController } from "../../controller/onChainController.ts/onChainController";
import { getUserData } from "../../controller/UserDataController/getUserData";


const ConversionStep2: React.FC = () => {

    const { state } = useCurrency();
    const {state:quoteState} = useQuote();
    const [loading, showLoading] = useState(false);
    const [completed, showCompleted] = useState(false);
    const [buttonClassname, setButtonClassname] = useState(pointsNone);
    const [baseFee ,setBaseFee] = useState(0);
    const [markupFee, setMarkupFee] = useState(0);
    const [quoteId, setQuoteId] = useState<number>(0);
    const [success, onSuccess] = useState(false);
    const [error, onError] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [inputValue, setInputValue] = useState(0);
    const [outputValue, setOutputValue] = useState(0);

    const [onSuccessMessage, setSuccessMessage] = useState<CompleteProps>({
        buttonText: 'Concluir',
        completeMessage: 'Conversão concluída',
        text: 'Você pode monitar suas transações através do dashboard incial.',
        path: '/home',
    });

    const isForWebSocket = (!isUsdcToUsdt(state) && !isUsdtToUsdc(state))
   
    const { state: webSocketState } = useWebSocket();

    useEffect(() => {

        const getWallet = async () => {

            const data = await getUserData();
            if(data?.wallets.evm) {
                setWalletAddress(data.wallets.evm);
            }
        }
        
        if(!isForWebSocket) {
            setButtonClassname(pointsAll);
        }

        getWallet();
        
    }, [webSocketState.webSocket, pointsAll]);
    

    const socketMessageHandler = () => {

        if(webSocketState.webSocket) {

            webSocketState.webSocket.onmessage = e => {

                const message = JSON.parse(e.data);
                
                if(message.error) {

                    setSuccessMessage({
                        buttonText: 'Voltar',
                        path: '/convert/1',
                        completeMessage: 'Um erro ocorreu',
                        text: 'Realize a operação novamente'

                    });

                    onError(true);
                    showCompleted(true);
                    showLoading(false);
                    setButtonClassname(hidden);


                    
                }

                console.log(message);
                
                if(message.data) {

                    setBaseFee(parseFloat(message.data.baseFee));
                    setMarkupFee(parseFloat(message.data.basePrice));
                    setQuoteId(message.data.quoteId);
                    setInputValue(message.data.amountBrl / 100);
                    setOutputValue(message.data.amountUsd / 100);
                    
                }   

                if(message.data && message.data.quoteId === quoteId && message.data.id) {

                    showLoading(false);
                    showCompleted(true);
                    setButtonClassname(hidden);
                    onSuccess(true);
                
                    
                }
                
            }


            if(webSocketState.webSocket && quoteId) {
                setButtonClassname(pointsAll);
            }

            
        }

    }

    useEffect(()=> {

        if(isForWebSocket) {
            socketMessageHandler();
        }

        if(success || error) {
            setButtonClassname(hidden);
        }
        
        

    },[socketMessageHandler, buttonClassname, success, error]);


    async function handleSubmit() {

        const isUsdcOrUsdt = isUsdcToUsdt(state) || isUsdtToUsdc(state);

        if(isUsdcOrUsdt && !isForWebSocket){

         
          const data = {
    
            chain: 'Polygon',
            to: walletAddress,
            inputCoin: state.sendCurrency,
            outputCoin: state.receiveCurrency,
            value: parseFloat(state.receiveValue.toFixed(2)) * 100,
            
          }
          

          setButtonClassname(pointsNone);
          showLoading(true);   
  
    
          try {
    
            const response = await onChainController(data.chain, data.to,data.inputCoin, data.outputCoin, data.value);

            if(response) {

                showLoading(false);
                showCompleted(true);
                setButtonClassname(hidden);
                onSuccess(true);

            }
    
          } catch(e:any) {

            setSuccessMessage({
                buttonText: 'Voltar',
                path: '/convert/1',
                completeMessage: 'Um erro ocorreu',
                text: 'Realize a operação novamente'

            });

            onError(true);
            showCompleted(true);
            showLoading(false);
            setButtonClassname(hidden);
    
          }
    
        } 

        setButtonClassname(pointsNone);
        showLoading(true);   
            
            if(webSocketState.webSocket && isForWebSocket) {
    
                     webSocketState.webSocket.send(JSON.stringify({
    
                   
                        messageId: "qualquer",
                        operation: "PlaceSwapOrder",
        
                        data: {
        
                            quoteId: quoteId,
                            notifyEmail: true,
                            // otp: message.data.code_1 + 
                            // message.data.code_2 + 
                            // message.data.code_3 + 
                            // message.data.code_4 + 
                            // message.data.code_5 + 
                            // message.data.code_6  
        
                        }
                            
                    }));
    
                }

        


    };

    return (

        <ContainerService path="/home" linkText="Dashboard">

            <ConversionContainer
            
                onSubmit={handleSubmit}
                activeIndex={2}
                buttonControl={buttonClassname}

                buttonComponent={
                <> Confirmar e converter <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                </>

                }
            >
                {!loading && !completed && (
                    <>
                        <TextModel
                            size="text-lg"
                            addons="text-gray-400 mx-auto text-center"
                            content={
                                <>
                                    <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                                    {`1 USD = ${quoteState.usdc[0].toBrl.toFixed(4)} BRL`}
                                </>
                            }
                        />

                        <ConversionCard currency={state.sendCurrency} value={formatNumberToString(inputValue, state.sendCurrency)} />
                        <IconBall absolute={false} icon={faArrowRightArrowLeft} rotation={90}/>
                        <ConversionCard currency={state.receiveCurrency} value={formatNumberToString(outputValue, state.receiveCurrency)} />

                        <div className="mt-6">
                            <div className="flex justify-between mb-6">
                                <TextModel addons="text-gray-400" weight="font-light" content={"Taxa de transação"} />
                                <TextModel addons="text-gray-400" weight="font-light" content={`- ${formatNumberToString(baseFee, 'BRL')}`} />
                            </div>
                            <div className="flex justify-between">
                                <TextModel addons="text-gray-400" weight="font-light" content={"Taxa de câmbio"} />
                                <TextModel addons="text-gray-400" weight="font-light" content={`- ${formatNumberToString(markupFee, 'BRL')}`} />
                            </div>
                        </div>
                    </>
                )}

                {loading && <Loading text="Processando..." />}

                {completed && <Completed {...onSuccessMessage} />}

            </ConversionContainer>

        </ContainerService>

    );
};

export default ConversionStep2;