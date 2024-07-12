import React, { useEffect, useState } from "react";
import { CurrencyActions, useCurrency } from "../../../../../context/Currency/CurrencyContext";
import ContainerService from "../../../Container/ContainerService";
import ConversionContainer from "../../../Container/ConversionContainer";
import IconBall from "../../../IconBall/IconBall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useBalance } from "../../../../../context/Balance/BalanceContext";
import InputSelect from "../../../MoneySelect/InputSelect";
import OutputSelect from "../../../MoneySelect/OutputSelect";
import TextModel from "../../../Text/Text";
import { useQuote } from "../../../../../context/Quote/QuoteContext";
import { POINTS_ALL, POINTS_NONE } from "../../../../../contants/classnames/classnames";
import { fetchWebSocket } from "../../../../../service/WebSocketService/fetchWebSocket";
import { useWebSocket } from "../../../../../context/WebSocket/WebSocketContext";
import { is0Value, isBalanceLessThanValue, isTheSameCoin, isWebSocketOff } from "../../../../../functions/OperationValidities/operationValidities";
import { isBrlaToUsd } from "../../../../../service/WebSocketService/WebSocketConstraints/webSocketContrainst";
import { isUsdToBrla } from "../../../../../Util/isUsdToBrla";
import { sendCoinToWebSocket } from "../../../../../service/CurrencyService/sendCoinToWebSocket";
import { TO_CONVERT_2, TO_HOME } from "../../../../../contants/Paths/paths";
import { TO_WEBSOCKET } from "../../../../../contants/divisionValues/divisionValues";
import { isForWebSocketOnSwap } from "../../../../../service/WebSocketService/Conversion/isForWebSocket";
import { useNavigate } from "react-router-dom";



const ConversionStep1: React.FC = () => {

    const {state, dispatch, conversor } = useCurrency();
    const [inputValue, setInputValue] = useState(0);
    const [outputValue, setOutputValue] = useState(0);
    const [isValuable, setIsValuable] = useState(false);
    const [buttonClassname, setButtonClassname] = useState(POINTS_NONE);
    const [errorMessage, setErrorMessage] = useState('');
    const {state:balanceState, getCoinToBalance} = useBalance();
    const {state:quoteState, createConversionTable} = useQuote();

    
    const converted = conversor(inputValue, state.sendCurrency, state.receiveCurrency,createConversionTable(quoteState));
    const { state: webSocketState, dispatch:webSocketDispatch } = useWebSocket();

    useEffect(()=> {


        if(inputValue && outputValue) {

            fetchWebSocket(webSocketState, webSocketDispatch);     
            
        }

    },[webSocketState.webSocket, inputValue, outputValue, buttonClassname]);

    useEffect(()=> {
    
        if(isForWebSocketOnSwap(state) && webSocketState.webSocket?.OPEN) {
       
            if(isValuable && webSocketState.webSocket.OPEN){
                
              setTimeout(()=> {

                  setButtonClassname(POINTS_ALL);
                  
              },1000);
  
            } else {
  
              setButtonClassname(POINTS_NONE);
  
            }
  
        } 
  
        if(isValuable){
          setButtonClassname(POINTS_ALL);
        } else {
          setButtonClassname(POINTS_NONE);
        }
        
  
      },[buttonClassname, webSocketState.webSocket, isValuable]);

    useEffect(() => {
      
      if(quoteState.brl && quoteState.usdc && quoteState.usdt) {

        setOutputValue(converted);

      }


  }, [state.sendCurrency, state.receiveCurrency,dispatch]);


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

            setErrorMessage("");
            setIsValuable(true);

        }

    }, [inputValue,webSocketState.webSocket,isValuable,
         outputValue, state.sendCurrency, state.receiveCurrency]);

    const navigate = useNavigate();
    
    const handleSubmit = async () => {

        if ((isUsdToBrla(state)) || isBrlaToUsd(state)) {   

            if(webSocketState.webSocket) {

                webSocketState.webSocket.send(JSON.stringify({

                    messageId: 'qualquer',
                    operation: 'Quote',
                    data: {
                        
                        amount: state.fixOutput ? 
                           Math.floor(parseInt((state.receiveValue  * TO_WEBSOCKET).toFixed(2)))
                         : Math.floor(parseInt((state.sendValue  * TO_WEBSOCKET).toFixed(2))),
            
                        chain: 'Polygon',
            
                        coin: isUsdToBrla(state) ? sendCoinToWebSocket(state.sendCurrency) : sendCoinToWebSocket(state.receiveCurrency),
            
                        usdToBrla: isUsdToBrla(state),
            
                        fixOutPut: state.fixOutput,
            
                        operation: 'swap'
                    }
            
                }));
            }
        }

        dispatch({
            type: CurrencyActions.setSendValue,
            payload: {sendValue: inputValue}
        });

        dispatch({
            type: CurrencyActions.setReceiveValue,
            payload: {receiveValue: outputValue}
        });

        navigate(TO_CONVERT_2);

    }

    return (

        <ContainerService path={TO_HOME} linkText="Dashboard">

            <ConversionContainer 
                onSubmit={handleSubmit}
                activeIndex={0}
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
