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
import { pointsAll, pointsNone } from "../../types/Button/buttonVariables";
import { useQuote } from "../../context/QuoteContext";
import { formatNumberToString } from "../../service/Formatters/FormatNumber/formatNumber";
import { POINTS_ALL, POINTS_NONE } from "../../contants/classnames/classnames";
import { initConversion } from "../../service/ConversionService/ConversionStep2Service/initConversion";
import { isForWebSocketOnSwap } from "../../service/WebSocketService/Conversion/isForWebSocket";
import { isUsdcOrUsdt } from "../../service/WebSocketService/WebSocketConstraints/webSocketContrainst";
import { onSwapError, onSwapSuccess } from "../../service/ConversionService/ConversionStep2Service/onSwapResponse";
import { swapOperationControl } from "../../service/ConversionService/ConversionStep2Service/swapOperationControl";
import { placeChainOrder } from "../../service/ConversionService/ConversionStep2Service/placeChainOrder";
import { placeSwapOrder } from "../../service/ConversionService/ConversionStep2Service/placeSwapOrder";


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

    const [errorMessage  ,setErrorMessage ] = useState<string>('');

    const [onSuccessMessage, setSuccessMessage] = useState<CompleteProps>({
        buttonText: '',
        completeMessage: '',
        text: '',
        path: '',
        image: '',
    });


   
    const { state: webSocketState } = useWebSocket();

    useEffect(() => {

        initConversion(state, setInputValue,setOutputValue,setWalletAddress,setButtonClassname);
        
    }, [webSocketState.webSocket, pointsAll, inputValue, outputValue]);

    const socketMessageHandler = () => {

        if(webSocketState.webSocket) {

            webSocketState.webSocket.onmessage = e => {

                const message = JSON.parse(e.data);
                
                if(message.error) {
                    setErrorMessage(message.error)
                    onError(true);
                }
                
                if(message.data) {

                    setBaseFee(parseFloat(message.data.baseFee));
                    setMarkupFee(parseFloat(message.data.basePrice));
                    setQuoteId(message.data.quoteId);
                    setInputValue(message.data.amountBrl / 100);
                    setOutputValue(message.data.amountUsd / 100);
                    
                }   

                if(message.data && message.data.quoteId === quoteId && message.data.id) {

                    onSuccess(true);
                    
                }

                console.log(message);
                
            }


            if(webSocketState.webSocket && quoteId) {
                setButtonClassname(POINTS_ALL);
            }

            
        }

    }

    useEffect(() => {

        onSwapSuccess(success, showLoading,showCompleted,setButtonClassname,setSuccessMessage);
        
    }, [success]);


    useEffect(() => {

        onSwapError(error,errorMessage, showLoading,showCompleted,setButtonClassname,setSuccessMessage);

    }, [error, errorMessage]);

    useEffect(()=> {

        swapOperationControl(isForWebSocketOnSwap, setButtonClassname, success,error, socketMessageHandler, state);

    },[socketMessageHandler, buttonClassname, success, error]);



    async function handleSubmit() {

        setButtonClassname(POINTS_NONE);
        showLoading(true);  
        
        if(isUsdcOrUsdt(state) && !isForWebSocketOnSwap(state)){

            placeChainOrder(state,walletAddress,setButtonClassname,showLoading,onSuccess,onError,setErrorMessage);
    
        } 

        if(webSocketState.webSocket && isForWebSocketOnSwap(state)) {
    
            placeSwapOrder(webSocketState.webSocket, quoteId)

        
        };

    }   

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
                                <TextModel addons="text-gray-400" weight="font-light" content={`- ${formatNumberToString(baseFee, state.receiveCurrency)}`} />
                            </div>
                            <div className="flex justify-between">
                                <TextModel addons="text-gray-400" weight="font-light" content={"Taxa de câmbio"} />
                                <TextModel addons="text-gray-400" weight="font-light" content={`- ${formatNumberToString(markupFee, state.sendCurrency)}`} />
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
