import React, { useEffect, useState } from "react";
import ContainerService from "../../../Container/ContainerService";
import TransfersContainer from "../../../Container/TransfersContainer";
import { CurrencyActions, useCurrency } from "../../../../../context/Currency/CurrencyContext";
import { useQuote } from "../../../../../context/Quote/QuoteContext";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useBalance } from "../../../../../context/Balance/BalanceContext";
import TextModel from "../../../Text/Text";
import InputSelect from "../../../MoneySelect/InputSelect";
import OutputSelect from "../../../MoneySelect/OutputSelect";
import { useWebSocket } from "../../../../../context/WebSocket/WebSocketContext";
import { BLOCK, HIDDEN, POINTS_ALL, POINTS_NONE } from "../../../../../contants/classnames/classnames";
import { isForWebSocketOnTransfer } from "../../../../../service/WebSocketService/Transfer/isForWebSocket";
import { fetchWebSocket } from "../../../../../service/WebSocketService/fetchWebSocket";
import { controllValueChange } from "../../../../../service/TransfersService/transfersStep1Service";
import { is0Value, isBalanceLessThanValue } from "../../../../../functions/OperationValidities/operationValidities";
import { isUsdToBrla } from "../../../../../Util/isUsdToBrla";
import { sendCoinToWebSocket } from "../../../../../service/CurrencyService/sendCoinToWebSocket";
import { usdToBrla } from "../../../../../service/WebSocketService/WebSocketConstraints/webSocketContrainst";
import { TO_HOME, TO_TRANSFERS_2 } from "../../../../../contants/Paths/paths";
import { TO_WEBSOCKET } from "../../../../../contants/divisionValues/divisionValues";


const TransferStep1: React.FC = () => {

  const { state, dispatch, conversor } = useCurrency();
  const { state: balanceState, getCoinToBalance } = useBalance();
  const { state: quoteState, createConversionTable } = useQuote();
  const [inputValue, setInputValue] = useState(0);
  const [outputValue, setOutputValue] = useState(0);
  const [buttonClassname, setButtonClassname] = useState(BLOCK);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValuable, setIsValuable] = useState(false);
  const [isVisible, setVisibility] = useState(HIDDEN);

  const {state:webSocketState, dispatch:webSocketDispatch} = useWebSocket();

  const converted = conversor(
    inputValue,
    state.sendCurrency,
    state.receiveCurrency,
    createConversionTable(quoteState)
  );

    useEffect(() => {

       

          if(isForWebSocketOnTransfer(state) && !webSocketState.webSocket?.OPEN) {

              fetchWebSocket(webSocketState, webSocketDispatch);
            
          } 

      

    }, [outputValue,inputValue, state, buttonClassname, fetchWebSocket]);
  

    

  useEffect(() => {


    isValuable ? setButtonClassname(POINTS_ALL) : setButtonClassname(POINTS_NONE);

  }, [

    isValuable,
    inputValue,
    balanceState,
    state.sendCurrency,
    getCoinToBalance,

  ]);


  useEffect(() => {

      controllValueChange(converted, setOutputValue, dispatch, inputValue, setVisibility, quoteState)

  }, [state.sendCurrency, state.receiveCurrency, inputValue, outputValue, isVisible]);

  useEffect(() => {

    const coinBalance = getCoinToBalance(state.sendCurrency, balanceState);



    
    const withoutValue = is0Value(inputValue, outputValue);
    const withoutBalance = isBalanceLessThanValue(
      inputValue,
      coinBalance,
    ); 

    if(isForWebSocketOnTransfer(state)) {

        if (withoutValue || withoutBalance || !webSocketState.webSocket?.OPEN) {
    
          setIsValuable(false);
          setErrorMessage(withoutValue || withoutBalance);
      
        } 

        if(webSocketState.webSocket?.OPEN && !withoutBalance && !withoutValue){

          setTimeout(()=> {

            setIsValuable(true);
            setErrorMessage("");

          },3000)


        }
      
        
    } else {

      if (withoutValue || withoutBalance) {
    
        setIsValuable(false);
        setErrorMessage(withoutValue || withoutBalance);
    
      } else {

        setIsValuable(true);
        setErrorMessage("");
      
      }
  

    }


  }, [inputValue, outputValue, state.sendCurrency, state.receiveCurrency, 
    buttonClassname, isValuable, isForWebSocketOnTransfer, webSocketState.webSocket]);



  const handleSubmit = () => {

    dispatch({
      type: CurrencyActions.setSendValue,
      payload: {sendValue: inputValue}
    })

    dispatch({
      type: CurrencyActions.setReceiveValue,
      payload: {receiveValue: outputValue}
    })

    if(isForWebSocketOnTransfer(state) && webSocketState.webSocket) {
      
        dispatch({
          type: CurrencyActions.setSendValue,
          payload: {sendValue: inputValue}
        });
    
        dispatch({
          type: CurrencyActions.setReceiveValue,
          payload: {receiveValue: outputValue}
        });

        console.log(Number(state.sendValue.toFixed(2)) * TO_WEBSOCKET);
        

        webSocketState.webSocket.send(JSON.stringify({

          messageId: 'qualquer',
          operation: 'Quote',

          data: {
              
              amount: parseInt((state.sendValue * TO_WEBSOCKET).toFixed(2)),
      
              chain: 'Polygon',

              coin: isUsdToBrla(state) ? sendCoinToWebSocket(state.sendCurrency) : sendCoinToWebSocket(state.receiveCurrency),
           
              usdToBrla: isUsdToBrla(state),

              fixOutPut: state.fixOutput,

              operation: !usdToBrla(state) ? 'swap' : 'pix-to-usd',

          }

      }));

    }
    
  }

  

  return (

    <ContainerService path={TO_HOME} linkText="Dashboard">

      <TransfersContainer

        onSubmit={handleSubmit}
        buttonControl={buttonClassname}
        activeIndex={0}
        location={TO_TRANSFERS_2}

      >

        <InputSelect

          coin={state.sendCurrency}
          value={inputValue}
          setInputValue={setInputValue}
          setOutputValue={setOutputValue}
          topText="Você envia"
          topIcon={faArrowUp}
          dispatch={dispatch}
          state={state}

        />

        <div className={isVisible}>

          <OutputSelect

            coin={state.receiveCurrency}
            value={outputValue}
            setInputValue={setInputValue}
            setOutputValue={setOutputValue}
            topText="Beneficiário Recebe"
            topIcon={faArrowDown}
            state={state}
            dispatch={dispatch}

          />

        </div>

        <div className="my-3">
          {errorMessage && (
            <TextModel
              addons="text-gray-500 text-center"
              content={errorMessage}
            />
          )}
        </div>

      </TransfersContainer>

    </ContainerService>
  );
  
}

export default TransferStep1;
