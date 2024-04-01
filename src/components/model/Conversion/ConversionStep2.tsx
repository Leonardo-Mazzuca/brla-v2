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
import { formatNumberToString } from "../../service/Formatters/FormatNumber/formatNumberToString";
import { sendCoinToWebSocket } from "../../service/CurrencyService/sendCoinToWebSocket";


const ConversionStep2: React.FC = () => {

    const { state, getCoin } = useCurrency();
    const {state:quoteState} = useQuote();
    const [loading, showLoading] = useState(false);
    const [completed, showCompleted] = useState(false);
    const [buttonClassname, setButtonClassname] = useState(pointsNone);
    const [baseFee ,setBaseFee] = useState(0);
    const [markupFee, setMarkupFee] = useState(0);
    const [amountConverted, setAmountConverted] = useState(0);
    const [amountToConvert, setAmountToConvert] = useState(0);
    const [quoteId, setQuoteId] = useState<number>(0);
    const [success, onSuccess] = useState(false);
    const [error, onError] = useState(false);

    const [onSuccessMessage, setSuccessMessage] = useState<CompleteProps>({
        buttonText: 'Concluir',
        completeMessage: 'Conversão concluída',
        text: 'Você pode monitar suas transações através do dashboard incial.',
        path: '/home',
    });

    const { state: webSocketState, dispatch } = useWebSocket();

    useEffect(() => {

        fetchWebSocket(webSocketState, dispatch);
        
    }, [webSocketState.webSocket]);

    const socketMessageHandler = () => {

        if(webSocketState.webSocket && webSocketState.webSocket.OPEN) {

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
                    setMarkupFee(parseFloat(message.data.markupFee));
                    setAmountConverted(message.data.amountUsd);
                    setAmountToConvert(message.data.amountBrl);
                    setQuoteId(message.data.quoteId);
                    
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

    


    useEffect(() => {

            setTimeout(()=> {


                if (webSocketState.webSocket && webSocketState.webSocket.OPEN) {
                    
                    webSocketState.webSocket.send(JSON.stringify({

                        messageId: 'qualquer',
                        operation: 'Quote',
                        data: {
                            
                            amount: state.fixOutput ? parseFloat(state.receiveValue) * 100
                             : parseFloat(state.sendValue) * 100,

                            chain: 'Polygon',

                            coin: sendCoinToWebSocket(state.receiveCurrency),

                            usdToBrla: state.sendCurrency === 'USDC',

                            fixOutPut: state.fixOutput,

                            operation: 'swap'
                        }

                    }));

                }

            },1200);






    }, [quoteId, webSocketState.webSocket, state, getCoin]);

    useEffect(()=> {

        socketMessageHandler();

        if(success || error) {
            setButtonClassname(hidden);
        }
        

    },[socketMessageHandler, buttonClassname, success, error]);


    async function handleSubmit() {

        setButtonClassname(pointsNone);
        showLoading(true);   

      
        
            if(webSocketState.webSocket) {

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

                        <ConversionCard currency={state.sendCurrency} value={formatNumberToString(amountToConvert / 100, getCoin(state.sendCurrency))} />
                        <IconBall absolute={false} icon={faArrowRightArrowLeft} rotation={90}/>
                        <ConversionCard currency={state.receiveCurrency} value={formatNumberToString(amountConverted / 100, getCoin(state.receiveCurrency))} />

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