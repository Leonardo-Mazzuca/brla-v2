import React, { useEffect, useState } from "react";
import { useCurrency } from "../../context/CurrencyContext";
import ContainerService from "../Container/ContainerService";
import ConversionContainer from "../Container/ConversionContainer";
import IconBall from "../IconBall/IconBall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useBalance } from "../../context/BalanceContext";

import InputSelect from "./InputSelect/InputSelect";
import OutputSelect from "./InputSelect/OutputSelect";
import { block, pointsAll, pointsNone } from "../../types/Button/buttonVariables";
import TextModel from "../Text/Text";
import { useQuote } from "../../context/QuoteContext";
import { is0Value, isBalanceLessThanValue, isTheSameCoin, isWebSocketOff } from "../../service/OperationValidities/operationValidities";
import { useWebSocket } from "../../context/WebSocketContext";
import { isUsdcToUsdt, isUsdtToUsdc } from "../../service/Util/onChain";
import { fetchWebSocket } from "../../service/WebSocketService/fetchWebSocket";
import { sendCoinToWebSocket } from "../../service/CurrencyService/sendCoinToWebSocket";
import { sendMessageToSwap } from "../../service/WebSocketService/sendMessageToSwap";


const ConversionStep1: React.FC = () => {

    const {state, dispatch, conversor } = useCurrency();
    const [inputValue, setInputValue] = useState(0);
    const [outputValue, setOutputValue] = useState(0);
    const [isValuable, setIsValuable] = useState(false);
    const [buttonClassname, setButtonClassname] = useState(block);
    const [errorMessage, setErrorMessage] = useState('');
    const {state:balanceState, getCoinToBalance} = useBalance();
    const {state:quoteState, createConversionTable} = useQuote();

    const converted = conversor(inputValue, state.sendCurrency, state.receiveCurrency,createConversionTable(quoteState));
    const { state: webSocketState, dispatch:webSocketDispatch } = useWebSocket();

    const isForWebSocket = (!isUsdcToUsdt(state) && !isUsdtToUsdc(state));

    useEffect(()=> {

        if(isForWebSocket) {
            fetchWebSocket(webSocketState, webSocketDispatch);
        }

    },[webSocketState.webSocket]);

    useEffect(() => {

      if(quoteState.brl && quoteState.usdc && quoteState.usdt) {

        setOutputValue(converted);

      }


  }, [state.sendCurrency, state.receiveCurrency]);

    useEffect(()=> {

        if(isUsdcToUsdt(state) || isUsdcToUsdt(state) && webSocketState.webSocket) {
            webSocketState.webSocket?.close();
        }

    },[webSocketState.webSocket]);


    useEffect(() => {

        const coinBalance = getCoinToBalance(state.sendCurrency, balanceState);
        const withoutValue = is0Value(inputValue, outputValue);
        const sameCoin =  isTheSameCoin(state.sendCurrency, state.receiveCurrency);
        const withoutBalance = isBalanceLessThanValue(inputValue,coinBalance);
        const webSocketNull = isWebSocketOff(webSocketState);


        if (withoutValue || sameCoin || withoutBalance || webSocketNull) {

            setIsValuable(false);
            setErrorMessage(withoutValue || sameCoin || withoutBalance)
            
        } else {

            setTimeout(()=> {
                setIsValuable(true);
                setErrorMessage('');
            },1000);

        }

    }, [inputValue,webSocketState.webSocket, outputValue, state.sendCurrency, state.receiveCurrency]);

    useEffect(() => {

        if(isValuable) {
            setButtonClassname(pointsAll)
        } else {
            setButtonClassname(pointsNone)
        }

    }, [isValuable, inputValue, balanceState, state.sendCurrency, getCoinToBalance]);

    const handleSubmit = () => {

        if (isForWebSocket && webSocketState.webSocket) {   
                sendMessageToSwap(webSocketState.webSocket, state);
        }

    }

    return (

        <ContainerService path="/home" linkText="Dashboard">

            <ConversionContainer 
                onSubmit={handleSubmit}
                activeIndex={0}
                location="/convert/2" 
                buttonComponent={<span>Próximo <FontAwesomeIcon icon={faArrowRight} /></span>}
                buttonControl={buttonClassname}
            >

                <InputSelect

                    coin = {state.sendCurrency}
                    value= {inputValue}
                    state={state}
                    dispatch={dispatch}
                    setInputValue={setInputValue}
                    setOutputValue={setOutputValue}

                />

                <IconBall absolute icon={faArrowDown} />

                <OutputSelect
                    coin = {state.receiveCurrency}
                    value= {outputValue}
                    state={state}
                    dispatch={dispatch}
                    setInputValue={setInputValue}
                    setOutputValue={setOutputValue}
            
                />

                <div>   
                    {errorMessage && 
                    <TextModel addons="text-gray-500 text-center" content={errorMessage} />}
                </div>
              

            

            </ConversionContainer>
            
        </ContainerService>
    );
};

export default ConversionStep1;
