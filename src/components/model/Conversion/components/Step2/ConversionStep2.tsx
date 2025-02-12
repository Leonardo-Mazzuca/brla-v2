import React, { useEffect, useState } from "react";
import ContainerService from "../../../Container/ContainerService";
import ConversionContainer from "../../../Container/ConversionContainer";
import { useCurrency } from "../../../../../context/Currency/CurrencyContext";
import TextModel from "../../../Text/Text";
import ConversionCard from "../ConversionCard/ConversionCard";
import IconBall from "../../../IconBall/IconBall";
import Loading from "../../../Loading/Loading";
import Completed, { CompleteProps } from "../../../Completed/Completed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useWebSocket } from "../../../../../context/WebSocket/WebSocketContext";
import { useQuote } from "../../../../../context/Quote/QuoteContext";
import { HIDDEN, POINTS_ALL, POINTS_NONE } from "../../../../../contants/classnames/classnames";
import { getUserData } from "../../../../../controller/UserDataController/getUserData";
import { isForWebSocketOnSwap } from "../../../../../service/WebSocketService/Conversion/isForWebSocket";
import { isUsdToBrla } from "../../../../../Util/isUsdToBrla";
import { TO_CONVERT_1, TO_HOME } from "../../../../../contants/Paths/paths";
import { getMarkupFee } from "../../../../../service/FeeService/getBaseFee";
import { isOnChain } from "../../../../../service/WebSocketService/WebSocketConstraints/webSocketContrainst";
import { TO_WEBSOCKET } from "../../../../../contants/divisionValues/divisionValues";
import { onChainController } from "../../../../../controller/onChainController.ts/onChainController";
import { placeSwapOrder } from "../../../../../service/ConversionService/ConversionStep2Service/placeSwapOrder";
import { formatNumberToString } from "../../../../../functions/Formatters/FormatNumber/formatNumber";



const ConversionStep2: React.FC = () => {

    const { state } = useCurrency();
    const {state:quoteState} = useQuote();
    const [loading, showLoading] = useState(false);
    const [completed, showCompleted] = useState(false);
    const [buttonClassname, setButtonClassname] = useState(POINTS_NONE);
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
        
    
        const getWallet = async () => {
    
            const data = await getUserData();

            if(data?.wallets.evm) {
                setWalletAddress(data.wallets.evm);
            }
        }
        
        if(!isForWebSocketOnSwap(state)) {
            setButtonClassname(POINTS_ALL);
        }
    
        getWallet();
        
    }, [webSocketState.webSocket, inputValue, outputValue]);

    const socketMessageHandler = () => {

        if(webSocketState.webSocket) {

            webSocketState.webSocket.onmessage = e => {

                const message = JSON.parse(e.data);
                
                if(message.error) {

                    setErrorMessage(message.error)
                    onError(true);

                }
                
                if(message.data) {
                    
                    if(isUsdToBrla(state)){

                        setInputValue(message.data.amountUsd / TO_WEBSOCKET);
                        setOutputValue(message.data.amountBrl / TO_WEBSOCKET);

                    } else {

                        setInputValue(message.data.amountBrl / TO_WEBSOCKET);
                        setOutputValue(message.data.amountUsd / TO_WEBSOCKET);
                    }
                    
                    setBaseFee(parseFloat(message.data.baseFee));
                    setMarkupFee(parseFloat(message.data.basePrice));
                    setQuoteId(message.data.quoteId);
                    
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

        if (success) {

            showLoading(false);
            showCompleted(true);
            setButtonClassname('invisible');
            setSuccessMessage({
                buttonText: 'Concluir',
                completeMessage: 'Conversão concluída',
                text: 'Você pode monitorar suas transações através do dashboard inicial.',
                path: TO_HOME,
            });
          
        }

   
        
    }, [success]);


    useEffect(() => {

        if (error) {
            showCompleted(true);
            showLoading(false);
            setButtonClassname('invisible');
            setSuccessMessage({
                buttonText: 'Voltar',
                path: TO_CONVERT_1,
                completeMessage: errorMessage,
                text: 'Realize a operação novamente',
                image: '/X-error.png',
            });
   
        }

    }, [error, errorMessage]);

    useEffect(()=> {

        if(success || error) {
            setButtonClassname('invisible');
        }

    },[success, error, buttonClassname])

    useEffect(()=> {

        const currencyMarkupFee = async () => {

            const fee = await getMarkupFee(state.receiveCurrency);
            setMarkupFee(fee);

        }

        
        
        if(!isForWebSocketOnSwap(state)) {

            setInputValue(state.sendValue)
            setOutputValue(state.receiveValue);
            currencyMarkupFee();

        }

   
        


    },[markupFee,isForWebSocketOnSwap,inputValue,outputValue]);

    useEffect(()=> {

        if(isForWebSocketOnSwap(state)) {
            socketMessageHandler();
        }

        if(!isForWebSocketOnSwap(state) && markupFee && onSuccessMessage.completeMessage === '') {
            setButtonClassname(POINTS_ALL);
        }


        if(onSuccessMessage.completeMessage !== '') {
            setButtonClassname(HIDDEN);
        }

        
    },[socketMessageHandler, buttonClassname,onSuccessMessage,markupFee, isForWebSocketOnSwap]);



    async function handleSubmit() {

        setButtonClassname(POINTS_NONE);
        showLoading(true);  
        
        if(isOnChain(state)){

            const data = {
    
                chain: 'Polygon',
                to: walletAddress,
                inputCoin: state.sendCurrency,
                outputCoin: state.receiveCurrency,
                value: Math.floor(state.receiveValue * TO_WEBSOCKET),
                
              }
              
        
              setButtonClassname(POINTS_NONE);
              showLoading(true);   
        
        
              try {
        
                await onChainController(data.chain, data.to,data.inputCoin, data.outputCoin, data.value);
                
                onSuccess(true);
                
        
              } catch(e:any) {
        
                setErrorMessage('Falha ao enviar dados')
                onError(true);
        
              }

        } else {
            
            if(webSocketState.webSocket) {
                
                placeSwapOrder(webSocketState.webSocket, quoteId)
            
            };

        }

    }   

    return (

        <ContainerService path={TO_HOME} linkText="Dashboard">

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
                                <TextModel addons="text-gray-400" weight="font-light" content={` ${formatNumberToString(markupFee, state.sendCurrency)}`} />
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
